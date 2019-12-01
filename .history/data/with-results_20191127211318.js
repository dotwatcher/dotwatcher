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
			search,
			activeClass,
			activeCategory,
			activeLocation
		} = ctx.query;

		if (year && race) {
			const allResultsResponse = await fetch(
				apiUrl(`/api/race?slug=${race}&year=${year}`, ctx.req)
			);
			const { results } = await allResultsResponse.json();
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
			const slug = race;

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
				finishlocations,
				activeLocation,
				hasNotes
			};
		} else {

			const allResultsResponse = () => { 
				if (search) {
					return await fetch(apiUrl(`api/search/race-by-name?name=${search}`))
				}
				return await fetch(apiUrl(`/api/all-races`, ctx.req));
			}

			const allRaces = await allResultsResponse.json();

			const allRiders = () => {
				if (search) {
					return await fetch(apiUrl(`api/search/rider-by-name?name=${search}`).json())
				}

				return []
			}


			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				race,
				year,
				search,
				allRaces,
				allRiders
			};
		}
	};

	return WithResults;
};
