import React from 'react';

import { Image, ImageProps } from 'react-native';
import TurboImage, { TurboImageProps } from 'react-native-turbo-image';

export type TAppImageProps = Readonly<TurboImageProps | ImageProps>;

export function AppImage({ source, ...rest }: TAppImageProps) {
  if (typeof source === 'number') {
    return <Image {...(rest as ImageProps)} source={source} />;
  }

  if ((source as TurboImageProps['source'])?.uri) {
    const uri = (source as TurboImageProps['source']).uri?.trim();

    return (
      <TurboImage
        {...(rest as TurboImageProps)}
        source={{ ...source, uri }}
        onFailure={async () => {
          await TurboImage.dispose([{ uri }]);
          await TurboImage.prefetch([{ uri }]);
        }}
      />
    );
  }

  return null;
}
