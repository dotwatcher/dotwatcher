// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import vars from './api-vars';

export const withEntry = Page => {
	const WithEntry = props => <Page {...props}/>;

	WithEntry.getInitialProps = async ({query: {id}}) => {
		const posts = [];
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const response = await client.getEntry(id);

		const entry = {
			sys: {
				id: response.sys.id
			},
			data: {
				title: response.fields.title || 'Post not found',
				format: response.fields.format || '',
				slug: response.fields.slug || 'no-post',
				date: response.sys.createdAt,
				body: response.fields.body || '',
				categories: response.fields.race || {},
				keyEvent: response.fields.keyPost || false,
				embed: response.fields.embed || ''
			}
		};

		if (response.fields.featuredImage) {
			entry.data.image = response.fields.featuredImage;
		}
		posts.push(entry);

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts
		};
	};

	return WithEntry;
};
