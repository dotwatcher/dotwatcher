const webpack = require("webpack");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
	target: "serverless",
	images: {
    deviceSizes: [480, 750, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["images.ctfassets.net"],
    path: '/_next/image',
    loader: 'default',
  },
	webpack: (config, { isServer }) => {
		config.plugins.push(new webpack.EnvironmentPlugin(process.env));

		return config;
	}
});
