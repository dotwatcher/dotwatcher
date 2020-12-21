// HOC for fetching entries from contentful

import React from "react";
import { createClient } from "contentful";
import vars from "./api-vars";

const client = createClient({
	space: vars.space,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const query = {
	content_type: vars.content_type.featureCategories,
	include: 2
};

export const withFeatureCategories = Page => {
	const WithFeatureCategories = props => <Page {...props} />;

	WithFeatureCategories.getInitialProps = async ctx => {
		const slug = ctx.query.slug && ctx.query.slug[0];

		try {
			const category = slug
				? await client.getEntries({ "fields.slug": slug, ...query })
				: await client.getEntries(query);

			let categoryEntries =
				category.items.length > 0
					? await client.getEntries({
							content_type: vars.content_type.feature,
							links_to_entry: category.items[0].sys.id,
							include: 2,
							order: "-sys.createdAt"
					  })
					: { items: [] };

			categoryEntries = {
				items: categoryEntries.items.map(i => ({
					sys: i.sys,
					fields: {
						title: i.fields.title,
						slug: i.fields.slug,
						excerpt: i.fields.excerpt,
						image: categoryEntries.includes.Asset.find(
							asset => asset.sys.id === i.fields.featuredImage.sys.id
						)
					}
				}))
			};

			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
				category,
				categoryEntries
			};
		} catch (error) {
			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
				error
			};
		}
	};

	return WithFeatureCategories;
};
