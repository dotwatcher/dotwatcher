module.exports = {
	siteUrl: "https://dotwatcher.cc",
	generateRobotsTxt: true,
	exclude: [
		"/sitemap.xml",
		"/profile/edit",
		"/digest/archive",
		"/500",
		"/login/error"
	], // <= exclude here
	robotsTxtOptions: {
		additionalSitemaps: [
			"https://dotwatcher.cc/api/sitemap.xml" // <==== Add here
		]
	}
};
