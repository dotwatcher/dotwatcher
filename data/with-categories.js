// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';
import vars from './api-vars';

export const withCategories = Page => {
	const WithCategories = props => <Page {...props}/>;

	WithCategories.getInitialProps = async () => {
		const client = createClient({
			space: vars.space,
			accessToken: vars.accessToken
		});

		const contenfulQuery = {
			content_type: vars.contentTypes.categories // eslint-disable-line camelcase
		};

		const response = await client.getEntries(contenfulQuery);

		const races = [];

		for (const item of response.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					description: item.fields.shortDescription,
					raceID: item.fields.trackleadersRaceId,
					raceDate: item.fields.raceDate
				}
			};

			if (item.fields.icon) {
				entry.data.icon = lodash.find(response.includes.Asset, obj => {
					return obj.sys.id === item.fields.icon.sys.id;
				});
			}
			races.push(entry);
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			races
		};
	};

	return WithCategories;
};
