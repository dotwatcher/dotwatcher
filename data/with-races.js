// HOC for fetching entries from contentful

import React from 'react';
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import {createClient} from 'contentful';
import vars from './api-vars';

export const withRaces = Page => {
	const WithRaces = props => <Page {...props}/>;

	WithRaces.getInitialProps = async () => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const racesQuery = {
			content_type: vars.content_type.categories,
			order: 'fields.raceDate'
		};

		const racesResponse = await client.getEntries(racesQuery);

		const races = [];

		for (const item of racesResponse.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					description: item.fields.shortDescription,
					raceID: item.fields.trackleadersRaceId,
					raceDate: item.fields.raceDate,
					raceEndDate: item.fields.raceEndDate,
					location: item.fields.location,
					length: item.fields.length,
					riders: item.fields.riders,
					winnerLabel: item.fields.winnerLabel,
					lastYearsWinner: item.fields.lastYearsWinner,
					terrain: item.fields.terrain,
					year: moment(item.fields.raceDate).format('YYYY')
				}
			};

			if (item.fields.icon) {
				entry.data.icon = racesResponse.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.icon.sys.id;
				});
			}

			if (moment(entry.data.raceEndDate).isBefore()) {
				entry.data.past = true;

				// https://data.dotwatcher.cc/data-d6ac28d/results.json?_facet=Year&_facet=Event&Event=${entry.data.title}&Year=${entry.data.year}&_shape=array&_size=3
				const raceResultsResponse = await fetch(`https://data.dotwatcher.cc/data-d6ac28d/results.json?Event=${entry.data.title}&Year=${entry.data.year}&_shape=array&_size=3`)
				const raceResultsJSON = await raceResultsResponse.json()
				if (raceResultsJSON) {
					entry.data.raceResults = raceResultsJSON
				}
			}

			races.push(entry);
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			races
		};
	};

	return WithRaces;
};
