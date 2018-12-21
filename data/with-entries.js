// HOC for fetching entries from contentful

import React from 'react';
import {createClient} from 'contentful';
import slugify from 'slugify';
import vars from './api-vars';
import fetch from 'isomorphic-fetch';

export const WithEntries = Page => {
	const WithEntries = props => <Page {...props}/>;

	WithEntries.getInitialProps = async ({query: {id}}) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const racesQuery = {
			content_type: vars.content_type.categories,
			order: 'fields.raceDate',
			include: 2
		};

		const racesResponse = await client.getEntries(racesQuery);
		const races = [];
		for (const item of racesResponse.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				fields: item.fields
			};
			if (item.fields.icon) {
				entry.fields.icon = racesResponse.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.icon.sys.id;
				});
			}
			races.push(entry);
		}

		const race = await races.find(obj => {
			return slugify(obj.fields.title, {lower: true}) === id || obj.sys.id === id;
		});

		const contenfulQuery = {
			content_type: vars.content_type.posts,
			'fields.category.sys.id': race.sys.id,
			order: '-sys.createdAt'
		};

		const response = await client.getEntries(contenfulQuery);

		const totalPosts = response.total;
		const posts = [];

		for (const item of response.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					format: item.fields.format,
					slug: item.fields.slug,
					date: item.sys.createdAt,
					body: item.fields.body,
					categories: item.fields.category,
					keyEvent: item.fields.keyPost,
					embed: item.fields.embed
				}
			};

			if (item.fields.featuredImage) {
				entry.data.image = response.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.featuredImage.sys.id;
				});
			}
			posts.push(entry);
		}

		const discourseReplyCount = await fetch(`https://community.dotwatcher.cc/t/${race.fields.discourseId}.json`)
		.then(response => {
			if (response.status >= 400) {
				return null
			}
			return response.json();
		})
		.then(data => {
			return data ? data.posts_count : null
		});

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts,
			totalPosts,
			race: race,
			raceID: race.sys.id,
			raceName: race.fields.title,
			trackleadersID: race.fields.trackleadersRaceId,
			raceImage: race.fields.icon.fields.file.url,
			replies: discourseReplyCount
		};
	};

	return WithEntries;
};
