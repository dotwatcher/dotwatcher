require('now-env');
const webpack = require('webpack');

module.exports = {
	target: 'serverless',
	webpack: config => {
		config.module.rules.push(
			{
				test: /\.(css)/,
				loader: 'emit-file-loader',
				options: {
					name: 'dist/[path][name].[ext]'
				}
			}
			,
			{
				test: /\.css$/,
				use: ['babel-loader', 'raw-loader', 'postcss-loader']
			}
		);
		config.plugins.push(
			new webpack.EnvironmentPlugin(process.env)
		);
		return config;
	}
};
