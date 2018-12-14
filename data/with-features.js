// HOC for fetching features from contentful

import React from 'react';
import {createClient} from 'contentful';
import vars from './api-vars';
import fetch from 'isomorphic-fetch';

export const WithFeatures = Page => {
	const WithFeatures = props => <Page {...props}/>;

	WithFeatures.getInitialProps = async ({query: {id}}) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const contenfulQuery = {
			content_type: vars.contentTypes.feature, // eslint-disable-line camelcase
			order: '-sys.createdAt'
		};

		const response = await client.getEntries(contenfulQuery);
		const features = [];

		for (const item of response.items) {
			const feature = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					excerpt: item.fields.excerpt,
					blocks: []
				}
			};

			if (item.fields.contentBlock) {
				for (const contentBlock of item.fields.contentBlock) {
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

					if (contentBlock.fields.image) {
						block.image = item.includes.Asset.find(obj => {
							return obj.sys.id === contentBlock.fields.image.sys.id;
						});
					}
					feature.data.blocks.push(block);
				}
			}

			if (item.fields.featuredImage) {
				feature.data.image = response.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.featuredImage.sys.id;
				});
			}
			features.push(feature);
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			features
		};
	};

	return WithFeatures;
};
