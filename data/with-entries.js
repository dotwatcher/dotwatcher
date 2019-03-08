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

		const contenfulQuery = {
			content_type: vars.content_type.posts,
			'fields.race.sys.contentType.sys.id': vars.content_type.categories,
			'fields.race.fields.slug': id,
			'order': '-sys.createdAt',
			'include': 3
		};

		const response = await client.getEntries(contenfulQuery);

		const totalPosts = response.total;
		const posts = [];
		const race = response.items[0].fields.race;

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
		})
		.catch(error => {
			return null
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
