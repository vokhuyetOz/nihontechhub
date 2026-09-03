import { host } from '@utils/resource';

import { FetchPost } from '../FetchApi';

export class ReportAPI {
  static async post(variables: { chapterId: string; text: string }) {
    const { data } = await FetchPost(`${host.api}/v1/user-report`, {
      chapterId: variables.chapterId,
      text: variables.text,
    });
    return data;
  }
}
