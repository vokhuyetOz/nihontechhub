import { getCrashlytics } from '@react-native-firebase/crashlytics';

import { CheckLogic } from '../../resource';
import { AccountService } from '../Account';
import { LanguageService } from '../Language';

import type { TFetchBaseOutput } from './types';
import { capitalizeFirstChar } from '../Convert';

const CommonCallAPI = async (
  api: string,
  header: RequestInit,
): Promise<TFetchBaseOutput<any>> => {
  const Strings = LanguageService.get();
  console.log('api', api);
  const account = AccountService.get();
  try {
    let headers: RequestInit['headers'] = {
      'Content-Type': 'application/json',
      'x-lang': capitalizeFirstChar(LanguageService.getCode()),
    };
    if (header) {
      //overide Content-type
      headers = {
        ...headers,
        ...header.headers,
      };
    }
    if (account?.token && !api.match(/google|apple/i)) {
      headers = {
        ...headers,
        Authorization: 'Bearer ' + account.token,
      };
    }
    const head = { ...header, headers };

    const response = await fetch(api, head);
    console.log('response', response.status);
    if (response.status >= 500) {
      throw new Error(Strings.Error_server);
    }

    if (response.status === 401 || response.status === 406) {
      AccountService.remove();
      throw new Error(Strings.Account_deactive);
    }

    // if (response.status === 403) {
    //   const resultRefresh = await refreshToken();
    //   if (!resultRefresh) {
    //     ResetFunction.resetToLogin();
    //     throw new Error(Strings.Account_deactive);
    //   }
    //   console.log('resultRefresh', resultRefresh);
    //   const currentToken = resultRefresh.data
    //     ? resultRefresh.data
    //     : resultRefresh.access_token;

    //   console.log('currentToken?', currentToken);
    //   if (currentToken) {
    //     head = {
    //       ...header,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + currentToken,
    //       },
    //     };
    //     console.log('head', head);
    //     response = await fetch(api, head);
    //   }
    //   // throw new Error('Image is not correct');
    // }

    // if (response.status !== 200) {
    //   throw new Error(result.message);
    // }
    const result = await response.json();
    console.log('result-comon-call', result);
    if (result?.code === 'USER_NOT_FOUND') {
      AccountService.remove();
      throw new Error(Strings.Account_deactive);
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    getCrashlytics().recordError(error);
    if (error.message === CheckLogic.No_internet) {
      throw new Error(Strings.Network_request_fail);
    }

    if (error.message === Strings.Account_deactive) {
      //TODO: add code handle
    }
    throw error;
  }
};

export const FetchGet = async (
  api: string,
  headers?: RequestInit['headers'],
) => {
  return CommonCallAPI(api, {
    method: 'GET',
    headers,
  });
};
export const FetchPost = async (api: string, body: object) => {
  return CommonCallAPI(api, {
    body: JSON.stringify(body),
    method: 'POST',
  });
};

export const FetchDelete = async (api: string) => {
  return CommonCallAPI(api, {
    method: 'DELETE',
  });
};
