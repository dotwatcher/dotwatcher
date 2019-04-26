// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import vars from './api-vars';

export const withFeature = Page => {
	const withFeature = props => <Page {...props}/>;

	withFeature.getInitialProps = async ({query: {slug}}) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		let featureResponse = await client.getEntries({
			'content_type': 'feature',
			'fields.slug': slug
		});

		// Because we added slugs later we need to stop old sys.id urls 404ing
		if (featureResponse.total === 0) {
			featureResponse = await client.getEntries({
				'sys.id': slug
			});
		}

		let feature;

		if (featureResponse.items[0]) {
			feature = {
				id: featureResponse.items[0].sys.id,
				title: featureResponse.items[0].fields.title,
				excerpt: featureResponse.items[0].fields.excerpt,
				text: featureResponse.items[0].fields.text,
				imageAnchor: featureResponse.items[0].fields.imageAnchor,
				blocks: []
			};

			if (featureResponse.items[0].fields.contributor) {
				feature.contributor = featureResponse.items[0].fields.contributor.fields

			}

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
