// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Need to do this for resolvers
// defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;
