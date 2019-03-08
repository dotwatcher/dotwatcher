// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import vars from './api-vars';

export const withHomepage = Page => {
	const WithHomepage = props => <Page {...props}/>;

	WithHomepage.getInitialProps = async () => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const homepageQuery = {
			'sys.id': vars.pages.homepage,
			'include': 2
		};

		const homepageResponse = await client.getEntries(homepageQuery);
		let page;

		if (homepageResponse.items[0]) {
			page = {
				id: homepageResponse.items[0].sys.id,
				title: homepageResponse.items[0].fields.title,
				text: homepageResponse.items[0].fields.text,
				blocks: []
			};

			if (homepageResponse.items[0].fields.contentBlock) {
				for (const contentBlock of homepageResponse.items[0].fields.contentBlock) {
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
						block.race = contentBlock.fields.race;
					}

					if (contentBlock.fields.feature) {
						block.feature = contentBlock.fields.feature.fields.slug;
					}

					if (contentBlock.fields.image) {
						block.image = homepageResponse.includes.Asset.find(obj => {
							return obj.sys.id === contentBlock.fields.image.sys.id;
						});
					}
					if (contentBlock.fields.logoOverlay) {
						block.logoOverlay = homepageResponse.includes.Asset.find(obj => {
							return obj.sys.id === contentBlock.fields.logoOverlay.sys.id;
						});
					}
					page.blocks.push(block);
				}
			}
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			page
		};
	};

	return WithHomepage;
};
