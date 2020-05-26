// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from "react";
import fetch from "isomorphic-fetch";
import formatter from "./formatter";
import apiUrl from "./../utils/api-url";

export const WithResults = Page => {
	const WithResults = props => <Page {...props} />;

	WithResults.getInitialProps = async ctx => {
		let {
			year,
			race,
			focus,
			activeClass,
			activeCategory,
			activeLocation
		} = ctx.query;

		if (year && race) {
			const allResultsResponse = await fetch(
				apiUrl(`/api/race?slug=${race}&year=${year}`, ctx.req)
			);

			const { results } = await allResultsResponse.json();

			if (results.length < 1) {
				// If nothing is returned, try and fetch the basic race info with no results
				const allResultsResponse = await fetch(
					apiUrl(`/api/race-name-from-slug?slug=${race}&year=${year}`, ctx.req)
				);

				const { results } = await allResultsResponse.json();

				return {
					name: results[0].name,
					description: results[0].description
				};
			}
			// console.log(results);
			const formattedResults = formatter(results);
			const racerClasses = [];
			const racerCategories = ["Both"];
			const finishlocations = [];
			const notes = [];

			formattedResults.forEach(result => {
				if (
					racerClasses.filter(racerClass => racerClass === result.class)
						.length < 1
				) {
					racerClasses.push(result.class);
				}
				if (
					racerCategories.filter(
						racerCategory => racerCategory === result.category
					).length < 1
				) {
					racerCategories.push(result.category);
				}
				if (
					finishlocations.filter(
						finishlocation => finishlocation === result.finishlocation
					).length < 1
				) {
					finishlocations.push(result.finishlocation);
				}
				if (result.notes !== "") {
					notes.push(result.notes);
				}
			});

			activeClass = activeClass || racerClasses[0];
			activeCategory = activeCategory || racerCategories[0];
			activeLocation = activeLocation || finishlocations[0];

			const hasNotes = notes.length > 0;
			const name = results[0].racename;
			const description = results[0].description;
			const slug = race;

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				name,
				description,
				slug,
				year,
				results: formattedResults,
				focus,
				racerClasses,
				racerCategories,
				activeClass,
				activeCategory,
				finishlocations,
				activeLocation,
				hasNotes
			};
		} else {
			const allResultsResponse = await fetch(apiUrl(`/api/all-races`, ctx.req));
			const allRaces = await allResultsResponse.json();
			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				year,
				allRaces
			};
		}
	};

	return WithResults;
};
