// HOC for fetching entries from contentful

import React from "react";
import { createClient } from "contentful";
import vars from "./api-vars";
import fetch from "isomorphic-fetch";
import Axios from "axios";
import https from 'https'

export const WithEntries = Page => {
	const WithEntries = props => <Page {...props} />;

	WithEntries.getInitialProps = async ({ query: { slug, reverse } }) => {
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const contenfulQuery = {
			content_type: vars.content_type.posts,
			"fields.race.sys.contentType.sys.id": vars.content_type.categories,
			"fields.race.fields.slug": slug,
			order: reverse ? "sys.createdAt" : "-sys.createdAt",
			include: 3
		};

		const response = await client.getEntries(contenfulQuery);

		const totalPosts = response.total;

		const race = response.items[0].fields.race;

		const posts = response.items.map(item => {
			return {
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
					embed: item.fields.embed,
					image: item.fields.featuredImage && response.includes.Asset.find(obj => {
						return obj.sys.id === item.fields.featuredImage.sys.id;
					})
				}
			}
		});

		let discourseReplyCount = race.fields.discourseId ? await fetch(
				`https://community.dotwatcher.cc/t/${race.fields.discourseId}.json`
			).then(response => {
				if (response.status >= 400) {
					return null;
				}
				return response.json();
			}).then(data => {
				return data ? data.posts_count : null;
			}).catch(error => {
				return null;
			}) : 0;

		const trackleadersID = race.fields.trackleadersRaceId;

		const followMyChallangeData = async () => {

			if (!trackleadersID.toLowerCase().includes('followmychallenge')) {
				return false
			}

			try {
				const { data } = await Axios({
					method: 'get',
					url: trackleadersID + 'api/dotwatcher/',
					httpsAgent: new https.Agent({  
  					rejectUnauthorized: false
					}),
					headers: {
						"X-Apikey": process.env.TRACKLEADERS_API_KEY
					}
				})

				return data;
			} catch (error) {
				console.log(error)
				return { error }
			}
		}

		const FMCData = await followMyChallangeData();

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			posts,
			totalPosts,
			race: race,
			raceID: race.sys.id,
			raceName: race.fields.title,
			trackleadersID,
			raceImage: race.fields.icon.fields.file.url,
			replies: discourseReplyCount,
			followMyChallange: FMCData && !FMCData.error && {
				leaderboard: FMCData
			}
		};
	};

	return WithEntries;
};
