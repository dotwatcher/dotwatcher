// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import vars from './api-vars';

export const WithResults = Page => {
	const WithResults = props => <Page {...props}/>;

	WithResults.getInitialProps = async ({query: { year, race }}) => {
		const raceResultsResponse = await fetch(`https://data.dotwatcher.cc/data-d6ac28d/results.json?Event=${race}&Year=${year}&_shape=array`)
		const results = await raceResultsResponse.json()

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			race,
			year,
			results
		};
	};

	return WithResults;
};
