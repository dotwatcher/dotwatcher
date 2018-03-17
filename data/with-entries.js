// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';

export const withEntries = Page => {
	const WithEntries = props => <Page {...props}/>;

	WithEntries.getInitialProps = async () => {
		const client = createClient({
			space: '6hyijb95boju',
			accessToken: 'f214dba82579af555cd4839172570328cf8aee10e37bf5b83094953bb65fb317'
		});

		const response = await client.getEntries({
			content_type: '2wKn6yEnZewu2SCCkus4as',
			order: '-sys.createdAt'
		});

		const posts = [];

		response.items.forEach(item => {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					slug: item.fields.slug,
					date: item.fields.date,
					body: item.fields.body
				}
			};
			posts.push(entry);
		});

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts
		};
	};

	return WithEntries;
};
