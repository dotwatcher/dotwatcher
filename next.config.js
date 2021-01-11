const webpack = require("webpack");
const withSourceMaps = require("@zeit/next-source-maps");
const path = require("path");

const redirectRiders = [
	{
		source: "Zoe%20Chauderlot",
		destination: "Zoé%20Chauderlot"
	},
	{
		source: "Mikko%20Makipaa",
		destination: "Mikko%20Mäkipää"
	},
	{
		source: "Ales%20Zavoral",
		destination: "Aleš%20Zavoral"
	},
	{
		source: "Alex%20Zavoral",
		destination: "Aleš%20Zavoral"
	},
	{
		source: "Bjorn%20Lenhard",
		destination: "Björn%20Lenhard"
	},
	{
		source: "Stuart%20Birnie",
		destination: "Stuart%20Birnie%20%28Hippy%29"
	}
];

module.exports = withSourceMaps({
	target: "serverless",
	images: {
		deviceSizes: [480, 750, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		domains: ["images.ctfassets.net"],
		path: "/_next/image",
		loader: "default"
	},
	async redirects() {
		const riders = redirectRiders.map(rider => ({
			source: `/profile/${rider.source}`,
			destination: `/profile/${rider.destination}`,
			permanent: true
		}));

		return riders;
	},
	async headers() {
		return [
			{
				source: "/api/:params*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*"
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Origin, X-Requested-With, Content-Type, Accept"
					},
					{
						key: "Access-Control-Allow-Credentials",
						value: "true"
					}
				]
			}
		];
	},
	webpack: (config, { isServer }) => {
		config.plugins.push(new webpack.EnvironmentPlugin(process.env));

		config.resolve.alias = {
			...config.resolve.alias,
			"@UI": path.resolve(__dirname, "./components/UI"),
			"@Components": path.resolve(__dirname, "./components"),
			"@ComponentsNew": path.resolve(__dirname, "./components/New"),
			"@Data": path.resolve(__dirname, "./data"),
			"@Utils": path.resolve(__dirname, "./utils"),
			"@Containers": path.resolve(__dirname, "./containers"),
			"@Queries": path.resolve(__dirname, "./queries"),
			"@Hooks": path.resolve(__dirname, "./hooks"),
			"@Data": path.resolve(__dirname, "./data"),
			"react-dom$": "react-dom/profiling",
			"scheduler/tracing": "scheduler/tracing-profiling"
		};

		return config;
	}
});
