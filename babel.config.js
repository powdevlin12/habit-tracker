module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'expo-router/babel',
			['@babel/plugin-proposal-decorators', { legacy: true }],
			'react-native-reanimated/plugin',
		],
	};
};
