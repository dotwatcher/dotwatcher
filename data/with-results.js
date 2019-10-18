// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import formatter from './formatter';

export const WithResults = Page => {
	const WithResults = props => <Page {...props} />

	WithResults.getInitialProps = async ({ query: { year, race, focus, activeClass, activeCategory, activeLocation } }) => {

		if (year && race) {
			const allResultsResponse = await fetch(`http://localhost:3000/api/race?slug=${race}&year=${year}`);
			const { results } = await allResultsResponse.json();
			const formattedResults = formatter(results)
			const racerClasses = []
			const racerCategories = ['Both']
			const finishLocations = []
			const notes = []

			formattedResults.forEach(result => {
				if (racerClasses.filter(racerClass => racerClass === result.class).length < 1) {
					racerClasses.push(result.class)
				}
				if (racerCategories.filter(racerCategory => racerCategory === result.category).length < 1) {
					racerCategories.push(result.category)
				}
				// if (finishLocations.filter(finishLocation => finishLocation === result['finish Location']).length < 1) {
				// 	finishLocations.push(result['finish Location'])
				// }
				if (result.notes !== '') {
					notes.push(result.notes)
				}
			})

			activeClass = activeClass || racerClasses[0]
			activeCategory = activeCategory || racerCategories[0]
			activeLocation = activeLocation || finishLocations[0]

			const hasNotes = notes.length > 0
			const name = results[0].racename
			const slug = race

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				name,
				slug,
				year,
				results: formattedResults,
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
			const allResultsResponse = await fetch(`http://localhost:3000/api/all-races`);
			const raceResultsByYear = await allResultsResponse.json();

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
