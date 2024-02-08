module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@/env',
          allowUndefined: false,
        },
      ],
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/utils': './src/utils',
            '@/assets': './src/assets',
            '@/constants': './src/constants',
            '@/hooks': './src/hooks',
            '@/types': './src/types',
            '@/services': './src/services',
            '@/theme': './src/theme',
            '@/config': './src/config',
            '@/lib': './src/lib',
            '@/api': './src/api',
          },
        },
      ],
    ],
  }
}
