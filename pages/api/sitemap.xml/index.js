import { SitemapStream, streamToPromise } from "sitemap";
import Axios from "axios";
import { createClient } from "contentful";
import vars from "../../../data/api-vars";

const client = createClient({
	space: vars.space,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const getriders = async () => {
	try {
		const { data } = await Axios({
			method: "get",
			url: "https://api.dotwatcher.cc/api/riders"
		});

		return data;
	} catch (error) {
		console.log(error);

		return [];
	}
};

const getraces = async () => {
	try {
		const { data } = await Axios({
			method: "get",
			url: "https://api.dotwatcher.cc/api/races"
		});

		return data.items;
	} catch (error) {
		console.log(error);

		return [];
	}
};

const getfeatures = async () => {
	try {
		const data = await client.getEntries({
			content_type: vars.content_type.feature,
			order: "-sys.createdAt"
		});

		return data.items;
	} catch (error) {
		console.log(error);

		return [];
	}
};

const getreports = async () => {
	try {
		const data = await client.getEntries({
			content_type: vars.content_type.race,
			order: "-sys.createdAt"
		});

		return data.items;
	} catch (error) {
		console.log(error);

		return [];
	}
};

const getfeaturescategories = async () => {
	try {
		const data = await client.getEntries({
			content_type: vars.content_type.featureCategories,
			order: "-sys.createdAt"
		});

		return data.items;
	} catch (error) {
		console.log(error);

		return [];
	}
};

const getcontributors = async () => {
	try {
		const data = await client.getEntries({
			content_type: vars.content_type.contributors,
			order: "-sys.createdAt"
		});

		return data.items;
	} catch (error) {
		console.log(error);

		return [];
	}
};

export default async (req, res) => {
	const riders = await getriders();
	const races = await getraces();
	const reports = await getreports();
	const features = await getfeatures();
	const featurescategories = await getfeaturescategories();
	const contributors = await getcontributors();

	try {
		const smStream = new SitemapStream({
			hostname: `https://${req.headers.host}`,
			cacheTime: 600000,
			lastmodDateOnly: true
		});

		riders.forEach(rider => {
			smStream.write({
				url: `/profile/${rider.name}`,
				changefreq: "daily",
				priority: 0.8
			});
		});

		races.forEach(race => {
			smStream.write({
				url: `/series/${race.name}`,
				changefreq: "daily",
				priority: 0.8
			});

			race.events.forEach(event => {
				smStream.write({
					url: `/results/${event.year}/${event.slug}`,
					changefreq: "daily",
					priority: 1
				});
			});
		});

		reports.forEach(report => {
			smStream.write({
				url: `/race/${report.fields.slug}`,
				changefreq: "daily",
				priority: 0.8
			});
		});

		features.forEach(feature => {
			smStream.write({
				url: `/feature/${feature.fields.slug}`,
				changefreq: "daily",
				priority: 0.5
			});
		});

		featurescategories.forEach(category => {
			smStream.write({
				url: `/features/${category.fields.slug}`,
				changefreq: "daily",
				priority: 0.5
			});
		});

		contributors.forEach(contributor => {
			smStream.write({
				url: `/contributor/${contributor.fields.slug}`,
				changefreq: "daily",
				priority: 0.3
			});
		});

		// End sitemap stream
		smStream.end();

		// XML sitemap string
		const sitemapOutput = (await streamToPromise(smStream)).toString();

		// Change headers
		res.writeHead(200, {
			"Content-Type": "application/xml"
		});

		// Display output to user
		res.end(sitemapOutput);
	} catch (e) {
		console.log(e);
		res.send(JSON.stringify(e));
	}
};
