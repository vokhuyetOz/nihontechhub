import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

export function Male(props: SvgProps) {
  return (
    <Svg width={16} height={14} viewBox="0 0 13 12" fill="none" {...props}>
      <Path
        d="M12.444.29a.418.418 0 00-.233-.234.44.44 0 00-.17-.035H8.25a.44.44 0 00-.437.437c0 .24.198.438.437.438h2.736L8.355 3.532h-.006A4.476 4.476 0 005.48 2.5 4.52 4.52 0 1010 7.02c0-1.09-.385-2.088-1.032-2.87l2.636-2.636V4.25c0 .24.199.437.438.437a.44.44 0 00.437-.437V.458a.44.44 0 00-.035-.169z"
        fill={props?.color}
      />
    </Svg>
  );
}

export function Female(props: SvgProps) {
  return (
    <Svg width={12} height={16} viewBox="0 0 9 13" fill="none" {...props}>
      <Path
        d="M8.583 4.25A4.08 4.08 0 004.5.167 4.08 4.08 0 00.417 4.25a4.08 4.08 0 003.645 4.06v1.336H2.75a.44.44 0 00-.438.437c0 .24.199.438.438.438h1.312v1.312c0 .24.199.438.438.438a.44.44 0 00.437-.438v-1.312H6.25a.44.44 0 00.437-.438.44.44 0 00-.437-.437H4.937V8.31a4.08 4.08 0 003.646-4.06z"
        fill={props?.color}
      />
    </Svg>
  );
}
