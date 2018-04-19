// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';
import vars from './api-vars';

export const withEntries = Page => {
	const WithEntries = props => <Page {...props}/>;

	WithEntries.getInitialProps = async ({query: {id, type}}) => {
		let contenfulQuery;
		const client = createClient({
			space: vars.space,
			accessToken: vars.accessToken
		});

		if (id && type === 'post') {
			contenfulQuery = {'sys.id': id};
		} else if (id && type === 'race') {
			contenfulQuery = {
				content_type: vars.contentTypes.posts, // eslint-disable-line camelcase
				'fields.category.sys.id': id
			};
		} else {
			contenfulQuery = {
				content_type: vars.contentTypes.posts, // eslint-disable-line camelcase
				order: '-sys.createdAt'
			};
		}

		const response = await client.getEntries(contenfulQuery);

		const posts = [];

		for (const item of response.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					format: item.fields.format,
					slug: item.fields.slug,
					date: item.fields.date,
					body: item.fields.body,
					categories: item.fields.category,
					keyEvent: item.fields.keyPost
				}
			};

			if (item.fields.featuredImage) {
				entry.data.image = lodash.find(response.includes.Asset, obj => {
					return obj.sys.id === item.fields.featuredImage.sys.id;
				});
			}
			posts.push(entry);
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts
		};
	};

	return WithEntries;
};
