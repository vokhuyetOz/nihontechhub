module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', './assets'],
        alias: {
          '@utils': './src/utils',
          '@elements': './src/elements',
          '@screens': './src/screens',
          '@navigators': './src/navigators',
          '@assets': './assets',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'METRO_TYPE',
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      },
    ],
    'react-native-worklets/plugin', // for v4 only
    // 'react-native-reanimated/plugin', // for v3 only
  ],
};
