// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';

export const WithResults = Page => {
	const WithResults = props => <Page {...props} />
	const baseURL = 'https://data.dotwatcher.cc/data-d6ac28d';

	WithResults.getInitialProps = async ({ query: { year, race } }) => {
		if (year && race) {
			const raceResultsResponse = await fetch(`${baseURL}/results.json?Event=${race}&Year=${year}&_shape=array`);
			const results = await raceResultsResponse.json();

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				year,
				results
			};
		} else {
			const allResultsResponse = await fetch(`${baseURL}.json?sql=select+DISTINCT+Event%2C+year+from+results+order+by+Event+ASC%2C+year+Desc&_shape=array`);
			const rawResults = await allResultsResponse.json();
			const raceResultsByYear = [];

			rawResults.forEach(row => {
				if (row.Event !== null) {
					if (raceResultsByYear.filter(result => (result.Event === row.Event)).length > 0) {
						raceResultsByYear.filter(result => (result.Event === row.Event))[0]['Year'].push(row['Year'])
					} else {
						row['Year'] = [row['Year']]
						raceResultsByYear.push(row)
					}
				}
			});

			console.log('raceResultsByYear', raceResultsByYear)
			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				year,
				raceResultsByYear
			};
		}
	};

	return WithResults;
};
