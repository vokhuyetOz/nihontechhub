import React from 'react';

import {
  GestureResponderEvent,
  Linking,
  Platform,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import Html, { RenderHTMLProps } from 'react-native-render-html';

import { useAppSize } from '@utils/modules';
// TODO: To check available props of HTML

export type AppHTMLProps = Omit<RenderHTMLProps, 'style' | 'whiteSpace'> & {
  style?: ViewStyle;
  whiteSpace?: boolean;
};

export function AppHTML({ style, source, whiteSpace = true }: AppHTMLProps) {
  const { Sizes } = useAppSize();

  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth: number) => {
    return Math.min(availableWidth, Sizes.wpx(300));
  };
  if (source && 'html' in source) {
    return (
      <View style={{ flex: 1, width: '100%', ...style }}>
        <Html
          ignoredStyles={['height', 'display', 'width']}
          contentWidth={contentWidth}
          computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
          dangerouslyDisableWhitespaceCollapsing={!whiteSpace}
          // renderers={{
          //   img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          //     return (
          //       <AppImage
          //         key={`${Math.random()}`}
          //         source={{uri: htmlAttribs.src}}
          //       />
          //     );
          //   },
          // }}
          renderersProps={{
            a: {
              onPress: (event: GestureResponderEvent, href: string) => {
                if (href.includes('http')) {
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  Linking.openURL(href).catch(() => {});
                } else {
                  let phoneNumber = href;
                  if (Platform.OS === 'ios') {
                    phoneNumber = `telprompt:${href}`;
                  } else {
                    phoneNumber = `tel:${href}`;
                  }
                  Linking.canOpenURL(phoneNumber)
                    .then(supported => {
                      if (supported) {
                        return Linking.openURL(phoneNumber);
                      }
                    })
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    .catch(() => {});
                }
              },
            },
          }}
          source={source}
        />
      </View>
    );
  }
  return null;
}
