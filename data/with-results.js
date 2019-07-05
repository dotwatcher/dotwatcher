// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import vars from './api-vars';

export const WithResults = Page => {
	const WithResults = props => <Page {...props} />

	WithResults.getInitialProps = async ({ query: { year, race, focus, activeClass, activeCategory, activeLocation } }) => {

		if (year && race) {
			const legacyLink = race.indexOf(' ') !== -1
			const raceResultsResponse = await fetch(`${vars.data.baseUrl}/results.json?${legacyLink ? 'Event' : 'Slug'}=${encodeURIComponent(legacyLink ? race : race.toLowerCase())}&Year=${year}&_size=max&_shape=array`);
			const results = await raceResultsResponse.json();
			const racerClasses = []
			const racerCategories = ['Both']
			const finishLocations = []
			const notes = []

			results.forEach(result => {
				if (racerClasses.filter(racerClass => racerClass === result['Class']).length < 1) {
					racerClasses.push(result['Class'])
				}
				if (racerCategories.filter(racerCategory => racerCategory === result['Category']).length < 1) {
					racerCategories.push(result['Category'])
				}
				if (finishLocations.filter(finishLocation => finishLocation === result['Finish Location']).length < 1) {
					finishLocations.push(result['Finish Location'])
				}
				if (result['Notes'] !== '') {
					notes.push(result['Notes'])
				}
			})

			activeClass = activeClass || racerClasses[0]
			activeCategory = activeCategory || racerCategories[0]
			activeLocation = activeLocation || finishLocations[0]

			const hasNotes = notes.length > 0
			const name = results[0]['Event']

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				name,
				year,
				results,
				focus,
				racerClasses,
				racerCategories,
				activeClass,
				activeCategory,
				finishLocations,
				activeLocation,
				hasNotes
			};
		} else {
			const allResultsResponse = await fetch(`${vars.data.baseUrl}.json?sql=select+DISTINCT+Event%2C+Year%2C+Slug+from+results+order+by+Event+ASC%2C+year+Desc&_shape=array`);
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
