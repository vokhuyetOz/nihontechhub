import React, { useState } from 'react';

import { Platform, View } from 'react-native';
import { getUniqueIdSync } from 'react-native-device-info';
import GoogleAuth from 'react-native-google-auth';
import { notify } from 'react-native-notificated';

import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { AppViewLoading } from '@elements/AppViewLoading';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {
  AccountService,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import {
  EGoogleLoginFlowType,
  TLoginWithApple,
} from '@utils/modules/FetchApi/Auth/AuthType';
import { ComonStyle, EAppLanguage, EAppOS, GoogleLogo } from '@utils/resource';

import { useMutationLoginWithApple } from '../modules/useMutationLoginWithApple';
import { useMutationLoginWithGoogle } from '../modules/useMutationLoginWithGoogle';
import {
  setActionRequireLogin,
  useRequireLogin,
} from '../modules/useRequireLogin';

function LoginFormGoogle() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const actionAfterLogin = useRequireLogin();

  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync } = useMutationLoginWithGoogle();

  const onPressGoogle = async () => {
    try {
      setSubmitting(true);
      const response = await GoogleAuth.signIn();

      if (response.type === 'success') {
        console.log('Sign in success:', response);

        if (response.data) {
          //ios google login
          //accessToken always null on android
          //ios one tap login
          const result = await mutateAsync({
            access_token: Platform.select({
              ios: response.data.accessToken,
              default: response.data.idToken,
            }) as string,
            os: EAppOS.IOS,
            deviceId: getUniqueIdSync(),
            active: true,
            language: EAppLanguage.VI,
            flow_type: Platform.select({
              android: EGoogleLoginFlowType.ONE_TAP,
              ios: EGoogleLoginFlowType.AUTH_CODE,
              default: EGoogleLoginFlowType.AUTH_CODE,
            }),
          });
          if (result.data) {
            AccountService.set(result.data);
          }
          actionAfterLogin?.();
          notify('success', {
            params: {
              title: Strings.Login_success,
            },
          });
          //hide login modal
          setActionRequireLogin();
        }
      }
    } catch (error) {
      notify('error', {
        params: {
          title: error instanceof Error ? error.message : Strings.Login_failed,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[ComonStyle.center, { marginBottom: Sizes.padding.default }]}>
      <AppTouchable
        disabled={submitting}
        onPress={onPressGoogle}
        style={[
          ComonStyle.center,
          ComonStyle.shadow(),
          {
            flexDirection: 'row',
            backgroundColor: Colors.app.Background_Base,
            borderRadius: Sizes.border_radius,
            paddingRight: Sizes.padding.small,
            shadowColor: Colors.app.Shape_Border,
            paddingVertical: Sizes.padding.smaller,
          },
        ]}
      >
        <GoogleLogo />
        <AppText style={[ComonStyle.bold, { fontSize: Sizes.smaller }]}>
          {Strings.Login_with_google}
        </AppText>
        {submitting && (
          <AppViewLoading
            sizeSpinner={Sizes.smaller}
            style={{ width: Sizes.larger }}
          />
        )}
      </AppTouchable>
    </View>
  );
}
function LoginFormApple() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const actionAfterLogin = useRequireLogin();

  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync } = useMutationLoginWithApple();

  const onPress = async () => {
    try {
      setSubmitting(true);
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const dto: TLoginWithApple = {
          id_token: appleAuthRequestResponse.identityToken as string,
          os: EAppOS.IOS,
          deviceId: getUniqueIdSync(),
          active: true,
          language: EAppLanguage.VI,
        };
        if (
          appleAuthRequestResponse.fullName?.familyName ||
          appleAuthRequestResponse.fullName?.givenName
        ) {
          dto.name = `${appleAuthRequestResponse.fullName?.familyName ?? ''} ${
            appleAuthRequestResponse.fullName?.givenName ?? ''
          }`.trim();
        }
        // user is authenticated
        const result = await mutateAsync(dto);
        console.log('result', result);
        if (result.data) {
          AccountService.set(result.data);
        }
        actionAfterLogin?.();
        notify('success', {
          params: {
            title: Strings.Login_success,
          },
        });
        //hide login modal
        setActionRequireLogin();
      }
    } catch (error) {
      notify('error', {
        params: {
          title: error instanceof Error ? error.message : Strings.Login_failed,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      style={[
        ComonStyle.center,
        ComonStyle.shadow(),
        { alignSelf: 'center', flexDirection: 'row' },
      ]}
    >
      <AppleButton
        buttonStyle={AppleButton.Style.DEFAULT}
        buttonType={AppleButton.Type.SIGN_IN}
        buttonText={Strings.Login_with_apple}
        style={{
          width: Sizes.wpx(190), // You must specify a width
          height: Sizes.wpx(50), // You must specify a height
          borderRadius: Sizes.border_radius,
        }}
        onPress={onPress}
      />
      {submitting && (
        <AppViewLoading
          sizeSpinner={Sizes.smaller}
          style={{ width: Sizes.larger }}
        />
      )}
    </View>
  );
}
export function LoginForm() {
  return (
    <View>
      <LoginFormGoogle />
      {Platform.OS === 'ios' && <LoginFormApple />}
    </View>
  );
}
