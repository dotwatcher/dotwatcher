import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';
import vars from './api-vars';

export const withPage = Page => {
	const withPage = props => <Page {...props}/>;

	withPage.getInitialProps = async ({query: {id}}) => {
		let page;

		const client = createClient({
			space: vars.space,
			accessToken: vars.accessToken
		});

		const response = await client.getEntries({'sys.id': id});

		console.log(response)

		if (response.items[0]) {
			page = {
				id: response.items[0].sys.id,
				title: response.items[0].fields.title,
				text: response.items[0].fields.text
			};
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			page
		};
	};

	return withPage;
};
