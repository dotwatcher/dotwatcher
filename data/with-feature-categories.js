// HOC for fetching entries from contentful

import React from "react";
import { createClient } from "contentful";
import vars from "./api-vars";

const client = createClient({
	space: vars.space,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const formatEntries = entries => ({
	items: entries.items.map(i => ({
		sys: i.sys,
		fields: {
			title: i.fields.title,
			slug: i.fields.slug,
			excerpt: i.fields.excerpt,
			image: entries.includes.Asset.find(
				asset => asset.sys.id === i.fields.featuredImage.sys.id
			)
		}
	}))
});

export const withFeatureCategories = Page => {
	const WithFeatureCategories = props => <Page {...props} />;

	WithFeatureCategories.getInitialProps = async ctx => {
		const slug = ctx.query.slug && ctx.query.slug[0];

		if (!slug) {
			try {
				let categoryEntries = await client.getEntries({
					content_type: vars.content_type.feature,
					include: 2,
					order: "-sys.createdAt"
				});

				categoryEntries = formatEntries(categoryEntries);

				return {
					...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
					categoryEntries
				};
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const category = await client.getEntries({
					"fields.slug": slug,
					content_type: vars.content_type.featureCategories,
					include: 2
				});

				let categoryEntries =
					category.items.length > 0
						? await client.getEntries({
								content_type: vars.content_type.feature,
								links_to_entry: category.items[0].sys.id,
								include: 2,
								order: "-sys.createdAt"
						  })
						: { items: [] };

				categoryEntries = formatEntries(categoryEntries);

				return {
					...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
					category,
					categoryEntries
				};
			} catch (error) {
				console.log(error);
				return {
					...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
					error
				};
			}
		}
	};

	return WithFeatureCategories;
};
