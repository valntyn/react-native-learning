const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('lottie');

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
