const webpack = require("webpack");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
	target: "serverless",
	webpack: (config, { isServer }) => {
		config.plugins.push(new webpack.EnvironmentPlugin(process.env));

		if (!isServer) {
			config.resolve.alias["@sentry/node"] = "@sentry/browser";
		}

		return config;
	}
});
