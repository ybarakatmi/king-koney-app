module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // NativeWind v4 uses Metro transformer, not Babel plugin
    ],
  };
};
