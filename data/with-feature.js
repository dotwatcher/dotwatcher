// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import vars from './api-vars';

export const withFeature = Page => {
	const withFeature = props => <Page {...props}/>;

	withFeature.getInitialProps = async ({query: {id}}) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const racesQuery = {
			content_type: vars.content_type.categories,
			order: 'fields.raceDate'
		};

		const racesResponse = await client.getEntries(racesQuery);
		const featureResponse = await client.getEntries({'sys.id': id});
		const races = [];
		let feature;

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
					raceEndDate: item.fields.raceEndDate
				}
			};

			if (item.fields.icon) {
				entry.data.icon = racesResponse.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.icon.sys.id;
				});
			}
			races.push(entry);
		}

		if (featureResponse.items[0]) {
			feature = {
				id: featureResponse.items[0].sys.id,
				title: featureResponse.items[0].fields.title,
				text: featureResponse.items[0].fields.text,
				blocks: []
			};

			if (featureResponse.items[0].fields.featuredImage) {
				feature.image = featureResponse.includes.Asset.find(obj => {
					return obj.sys.id === featureResponse.items[0].fields.featuredImage.sys.id;
				});
			}

			if (featureResponse.items[0].fields.contentBlock) {
				for (const contentBlock of featureResponse.items[0].fields.contentBlock) {
					const block = {
						sys: {
							id: contentBlock.sys.id
						},
						heading: contentBlock.fields.heading,
						layout: contentBlock.fields.layout,
						words: contentBlock.fields.words,
						link: contentBlock.fields.link,
						callToAction: contentBlock.fields.callToActionText
					};

					if (contentBlock.fields.race) {
						block.race = races.find(obj => {
							return obj.sys.id === contentBlock.fields.race.sys.id;
						});
					}

					if (contentBlock.fields.image) {
						block.image = featureResponse.includes.Asset.find(obj => {
							return obj.sys.id === contentBlock.fields.image.sys.id;
						});
					}
					if (contentBlock.fields.logoOverlay) {
						block.logoOverlay = featureResponse.includes.Asset.find(obj => {
							return obj.sys.id === contentBlock.fields.logoOverlay.sys.id;
						});
					}
					feature.blocks.push(block);
				}
			}
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			feature
		};
	};

	return withFeature;
};
