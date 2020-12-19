// HOC for fetching entries from contentful

import React from "react";
import { createClient } from "contentful";
import vars from "./api-vars";

export const withFeatureCategories = Page => {
	const withFeatureCategories = props => <Page {...props} />;

	withFeatureCategories.getInitialProps = async ctx => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		try {
			const category = await client.getEntries({
				content_type: vars.content_type.featureCategories,
				"fields.slug": ctx.query.slug,
				include: 2
			});

			const entries =
				category.items.length > 0
					? await client.getEntries({
							content_type: vars.content_type.feature,
							links_to_entry: category.items[0].sys.id,
							include: 2,
							order: "-sys.createdAt"
					  })
					: [];

			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
				data: {
					category,
					entries
				}
			};
		} catch (error) {
			return {
				error,
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
			};
		}
	};

	return withFeatureCategories;
};
