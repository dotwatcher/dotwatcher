import Head from "next/head";
import PropTypes from "prop-types";
import Pusher from "pusher-js";
import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import styled, { css } from "styled-components";
import tachyons from "styled-components-tachyons";
import Button from "../../components/shared/button";
import SocialIcons from "../../components/shared/social-icons";
import Header from "../../components/header";
import KeyEvents from "../../components/key-events";
import MapContainer from "../../components/map-container";
import Page from "../../components/shared/page";
import Post from "../../components/post";
import StaticTopRiders from "../../components/top-riders/static";
import DynamicTopRiders from "../../components/top-riders/dynamic";
import FactFile from "../../components/fact-file";
import Tabs from "../../components/tabs";
import Community from "../../components/community";
import Wrapper from "../../components/shared/wrapper";
import vars from "../../data/api-vars";
import { WithEntries } from "../../data/with-entries";
import Link from "next/link";
import { compose } from "recompose";
import { withRouter } from "next/router";

import {H1, H2, P, Span, A, Div } from '../../components/UI/Tachyons'

const OrderButtons = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding: 30px 0;
`;
const OrderButton = styled.a`
	padding: 15px 30px;

	${({ selected }) =>
		selected
			? css`
					background: var(--blue);
					color: var(--white);
			  `
			: css`
					background: transparent;
					color: var(--near_black);
			  `}
`;

const Notification = styled(Button)`
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	@media screen and (min-width: 48em) {
		top: inherit;
	}
	@media screen and (min-width: 64em) {
		left: 80%;
	}
`;

// Pusher.logToConsole = true;
const pusher = new Pusher(process.env.PUSHER_KEY, {
	cluster: "eu",
	encrypted: true
});
const channel = pusher.subscribe("dotwatcher");

const Race = (props) => {
	const [state, setState] = useState({
		skip: 5,
		loading: false,
		newPost: false,
		newPostIDs: [],
		activeTab: "feed"
	})


	console.log('adasdsadsa')
	useEffect(() => {
		if (location.hash === "#chat") {
			setActiveTab("community");
		}

		channel.bind("new-post", newPostEvent => {
			const isNewPost =
				props.posts.find(obj =>  obj.sys.id === newPostEvent.post) === undefined;

			if (newPostEvent.category === props.raceID && isNewPost) {
				setState(prev => ({
					...prev,
					newPost: true,
					newPostIDs: [newPostEvent.post, ...state.newPostIDs]
				}));
			}
		});

		() => channel.unbind("new-post")
	}, [])

	const setActiveTab = tab => {
		setState(prev => ({
			...prev,
			activeTab: tab
		}));
	}

	const fetchPosts = async (id) => {
		setState(prev => ({ ...prev, loading: true }));

		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const response = await client.getEntries({ "sys.id": id });

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

			props.posts.unshift(entry);
		}
		await setState(prev => ({
			...prev, 
			loading: false
		}));
	}

	const showNextPageOfPosts = () => {
		setState(prevState => ({ ...prevState, skip: state.skip + 5 }));
	}

	const loadPost = () => {
		state.newPostIDs.forEach(postID => fetchPosts(postID));

		setState({
			newPost: false,
			newPostIDs: []
		});
	}

	const KeyEventsWrapper = styled.div`
		@media screen and (max-width: 30em) {
			&:after {
				content: "";
				border-top: 0.125rem solid var(--light-gray);
				position: absolute;
				width: calc(100% - 2 * var(--spacing-medium));
				bottom: 0;
				left: var(--spacing-medium);
				height: var(--spacing-medium);
			}
		}

		@media screen and (min-width: 64em) {
			margin-left: ${props.trackleadersID ? "40%" : 0};
		}
		${tachyons}
	`;

	const Feed = styled.div`
		display: ${state.activeTab === "feed" ? "block" : "none"};
		${tachyons}
	`;
	const CommunityWrap = styled.div`
		display: ${state.activeTab === "community" ? "block" : "none"};
		${tachyons}
	`;

	const morePostsButton = (
		<Button
			db
			w5
			loading={state.loading}
			onClick={showNextPageOfPosts}
		>
			{state.loading ? "Loading..." : "Load more posts"}
		</Button>
	);

	let morePosts = null;
	if (props.totalPosts > state.skip) {
		morePosts = morePostsButton;
	} else if (props.posts.length === 0) {
		morePosts = null;
	} else {
		morePosts = (
			<H1 mt3 tc moon_gray tracked ttu i>
				Fin
			</H1>
		);
	}

	let newPostsNotification = null;
	const updateMessageQualifier =
		state.newPostIDs.length > 1 ? "updates" : "update";
	if (state.newPost) {
		newPostsNotification = (
			<Notification
				fixed
				z_1
				loading={state.loading}
				onClick={loadPost}
				href="#posts"
			>
				{state.loading
					? `Loading...`
					: `${state.newPostIDs.length} new ${updateMessageQualifier}`}
			</Notification>
		);
	}

	return (
		<Page>
			<Head>
				<title>{props.raceName} – DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${props.raceName} – DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content={
						props.race.fields.shortDescription
							? props.race.fields.shortDescription
							: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
					}
				/>
				<meta property="og:image" content={props.raceImage} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content={`${props.raceName} – DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content={
						props.race.fields.shortDescription
							? props.race.fields.shortDescription
							: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
					}
				/>
				<meta name="twitter:image" content={props.raceImage} />
				<meta
					name="description"
					content={
						props.race.fields.shortDescription
							? props.race.fields.shortDescription
							: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
					}
				/>
				<meta name="twitter:label1" content="Location" />
				<meta
					name="twitter:data1"
					content={props.race.fields.location}
				/>
				<meta name="twitter:label2" content="Length" />
				<meta name="twitter:data2" content={props.race.fields.length} />
				<script src="//www.instagram.com/embed.js" />
			</Head>
			<Header
				user={props.user}
				title="dotwatcher.cc"
				raceName={props.raceName}
				race={props.race}
			/>
			{props.trackleadersID ? (
				<MapContainer raceID={props.trackleadersID} />
			) : null}
			<KeyEventsWrapper
				fl
				ph3
				ph4_ns
				pb2
				w_100
				w_30_m
				w_20_l
				mt4_l
				relative
				id="events-wrap"
			>
				{props.race.fields.leaderboard === true && (
					<DynamicTopRiders race={props.race} />
				)}

				{props.race.fields.staticLeaderboard && (
					<StaticTopRiders race={props.race} />
				)}

				{props.race.fields.whatsAppId && (
					<Div fl w_50 w_100_ns pr3 pr0_ns mb4>
						<header>
							<H2
								ttu
								tracked
								f5
								fw6
								mt0
								pb1
								bb
								bw1
								b__light_gray
								measure_narrow
							>
								Join the Conversation on WhatsApp
							</H2>

							<A
								link
								near_black
								hover_blue
								underline
								href={`https://chat.whatsapp.com/${props.race.fields.whatsAppId}`}
								target="_blank"
							>
								Click Here
							</A>
						</header>
					</Div>
				)}

				<FactFile race={props.race} />

				<KeyEvents posts={props.posts} skip={state.skip} />
			</KeyEventsWrapper>

			<Wrapper ph3 pb2 w_100 w_70_m w_40_l>
				{props.race.fields.discourseId && props.replies ? (
					<React.Fragment>
						<Tabs
							setActiveTabFeed={() => setActiveTab("feed")}
							setActiveTabCommunity={() => setActiveTab("community")}
							activeTab={state.activeTab}
							count={props.replies}
							promo={props.race.fields.chatPromo}
						/>
						<CommunityWrap>
							<Community
								id={props.race.fields.discourseId}
								active={state.activeTab === "community"}
							/>
						</CommunityWrap>
					</React.Fragment>
				) : null}
				<Feed id="posts">
					{newPostsNotification}

					<OrderButtons>
						<Link
							href={`/race/${props.router.query.slug}?reverse=true`}
							passHref
						>
							<OrderButton selected={!!props.router.query.reverse}>
								Oldest First
							</OrderButton>
						</Link>

						<Link
							href={`/race/${props.router.query.slug}`}
							passHref
						>
							<OrderButton selected={!props.router.query.reverse}>
								Newest First
							</OrderButton>
						</Link>
					</OrderButtons>

					{props.posts.map((item, index) => {
						if (index <= state.skip) {
							return (
								<Post
									key={item.sys.id}
									id={item.sys.id}
									data={item.data}
									index={index}
								/>
							);
						}
					})}
					{morePosts}
					<P measure lh_copy f6 silver>
						If you would like to get in touch email us at{" "}
						<A
							link
							gray
							underline
							hover_blue
							href="mailto:info@dotwatcher.cc"
						>
							info@dotwatcher.cc
						</A>
					</P>
					<P measure f6 silver>
						<Span silver dib mr2 v_btm>
							Follow along at
						</Span>{" "}
						<SocialIcons size="1" colour="gray" />
					</P>
				</Feed>
			</Wrapper>
		</Page>
	);
}

Race.propTypes = {
	posts: PropTypes.array.isRequired,
	totalPosts: PropTypes.number.isRequired,
	trackleadersID: PropTypes.string.isRequired,
	raceName: PropTypes.string.isRequired,
	raceID: PropTypes.string.isRequired,
	race: PropTypes.object.isRequired,
	raceImage: PropTypes.string.isRequired
};

const enhance = compose(WithEntries, withRouter);

export default enhance(Race);
