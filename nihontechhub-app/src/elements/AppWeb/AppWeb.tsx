import React, { useRef, useState } from 'react';

import { View } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';

import { useAppLanguage, useAppSize } from '@utils/modules';

import { AppViewDataNull } from '../AppViewDataNull';

//TODO: refactor code
type TAppWeb = Readonly<{
  source: _SourceUri;
  webRef?: React.RefObject<any>;
}> &
  WebViewProps;
export function AppWeb({ source, webRef, onLoadStart, ...rest }: TAppWeb) {
  const { Sizes } = useAppSize();
  const [error, setError] = useState({ status: false, message: '' });
  const localRef = useRef<any>(null);
  const { Strings } = useAppLanguage();
  const webViewRef = webRef ?? localRef;

  const onPressRetry = () => {
    error.status = false;
    webViewRef.current?.reload();
  };
  const onError = () => {
    setError({ status: true, message: Strings.Retry });
  };
  const handleLoadStart: WebViewProps['onLoadStart'] = event => {
    error.status = false;
    onLoadStart?.(event);
  };

  const renderError = () => {
    if (error.status) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Sizes.device_width,
            padding: Sizes.padding.default,
          }}
        >
          <AppViewDataNull title={Strings.Retry} onPress={onPressRetry} />
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, flexGrow: 1 }}>
      {renderError()}
      <WebView
        ref={webViewRef}
        style={{
          width: Sizes.device_width,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
          opacity: 0.99,
        }}
        containerStyle={{ overflow: 'hidden' }} // Fix bug crash on some android devices
        originWhitelist={['*']}
        onError={onError}
        onLoadStart={handleLoadStart}
        source={source}
        {...rest}
      />
    </View>
  );
}
