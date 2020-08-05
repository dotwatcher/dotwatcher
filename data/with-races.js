// HOC for fetching entries from contentful

import React from "react";
import moment from "moment";
import fetch from "isomorphic-fetch";
import { createClient } from "contentful";
import vars from "./api-vars";

export const withRaces = (Page) => {
	const WithRaces = (props) => <Page {...props} />;

	WithRaces.getInitialProps = async (ctx) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
		});

		const racesQuery = {
			content_type: vars.content_type.categories,
			order: "-fields.raceDate",
		};

		const racesResponse = await client.getEntries(racesQuery);

		let races = [];

		for (const item of racesResponse.items) {
			const entry = {
				sys: {
					id: item.sys.id,
				},
				data: {
					title: item.fields.title,
					slug: item.fields.slug,
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
					year: moment(item.fields.raceDate).format("YYYY"),
					calendarOnly: item.fields.calendarOnly,
					website: item.fields.website,
				},
			};

			if (item.fields.icon) {
				entry.data.icon = racesResponse.includes.Asset.find((obj) => {
					return obj.sys.id === item.fields.icon.sys.id;
				});
			}
			// This was really slowing down the load of the page as it’s doing x network requests for every race on the page, it’s not even that useful as we only have results for <40% ATM think will park this until we have the new DB and we could do the lookup in one neat query
			// if (moment(entry.data.raceEndDate).isBefore()) {
			// 	entry.data.past = true;

			// 	const raceResultsResponse = await fetch(`https://data.dotwatcher.cc/data/results.json?Event=${entry.data.title}&Year=${entry.data.year}&_shape=array&_size=3`)
			// 	const raceResultsJSON = await raceResultsResponse.json()
			// 	if (raceResultsJSON) {
			// 		entry.data.raceResults = raceResultsJSON
			// 	}
			// }

			races.push(entry);
		}

		races = races.filter((race) => race.data.slug !== "covid-19-updates");

		return {
			...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
			races,
		};
	};

	return WithRaces;
};
