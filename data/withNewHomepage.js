// HOC for fetching entries from contentful

import React from "react";
import client from "@Utils/contentful";
import vars from "./api-vars";

const withHomepage = Page => {
	const WithHomepage = props => <Page {...props} />;

	WithHomepage.getInitialProps = async () => {
		try {
			const homepage = await client.getEntries({
				"sys.id": vars.pages.newhomepage,
				include: 2
			});

			console.log(homepage);

			const recentReports = await client.getEntries({
				content_type: vars.content_type.feature,
				order: "-sys.createdAt",
				include: 2,
				limit: 4
			});

			const recentFeatures = await client.getEntries({
				content_type: vars.content_type.categories,
				order: "-fields.raceDate",
				include: 2,
				limit: 4
			});

			const page = {
				recentFeatures: recentFeatures.items,
				recentReports: recentReports.items.map(i => ({
					title: i.title,
					slug: i.slug,
					excerpt: i.excerpt,
					contributor: i.contributor,
					featuredImage: recentReports.includes.Asset.find(asset => {
						return asset.sys.id === i.fields.featuredImage.sys.id;
					})
				}))
			};

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				page
			};
		} catch (error) {
			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				error
			};
		}
	};

	return WithHomepage;
};

export default withHomepage;
