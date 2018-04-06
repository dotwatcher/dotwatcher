// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';

export const withEntries = Page => {
	const WithEntries = props => <Page {...props}/>;

	WithEntries.getInitialProps = async ({query: {id, type}}) => {
		let contenfulQuery
		const client = createClient({
			space: '6hyijb95boju',
			accessToken: 'f214dba82579af555cd4839172570328cf8aee10e37bf5b83094953bb65fb317'
		});

		if (id && type === 'post') {
			contenfulQuery = {'sys.id': id}
		} else if (id && type === 'race') {
			contenfulQuery = {
				content_type: '2wKn6yEnZewu2SCCkus4as', // eslint-disable-line camelcase
				'fields.category.sys.id': id
			}
		} else {
			contenfulQuery = {
				content_type: '2wKn6yEnZewu2SCCkus4as', // eslint-disable-line camelcase
				order: '-sys.createdAt'
			}
		}

		const response = await client.getEntries(contenfulQuery);

		console.log(response)

		const posts = [];

		for (let item of response.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
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
		};

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts
		};
	};

	return WithEntries;
};
