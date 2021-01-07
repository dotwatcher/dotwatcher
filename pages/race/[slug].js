// /race/:slug
// /race/:slug?showMap=1
// /race/:slug?reverse=true
// /race/:slug?post=C83xOIsWoe76I8ib4ggmN#events -> shows a single post
// /race/:slug#posts -> to link directly to the top of the events feed
// /race/:slug#[:postid] -> to link directly to a specific post (it must be in the current data set)

import Head from "next/head";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import H1 from "@Components/UI/H1";
import H3 from "@Components/UI/H3";
import H2 from "@Components/UI/H2";
import Center from "@Components/UI/Center";
import { useRouter } from "next/router";
import Link from "next/link";

import Select from "@Components/UI/OptionSelect";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Section from "@Components/UI/Section";
import axios from "axios";
import https from "https";
import { loadMoreQuery } from "@Queries/race";

import {
	Header,
	RaceIFrame,
	KeyEvents,
	LiveLeaderboard,
	StaticLeaderboard,
	PostFeed
} from "@ComponentsNew/Race";

const POST_PER_VIEW = 3;

const ContentGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: ${dim(2)};
	grid-template-areas:
		"events events events leaderboard leaderboard leaderboard"
		"posts posts posts posts posts posts ";

	${mq.mdUp`
		max-width: 1800px;
		margin: 0 auto;
		grid-template-columns: repeat(12, 1fr);
		grid-column-gap: ${dim(4)};
		grid-template-areas: unset;
`}
`;

const ContentItem = styled.div`
	position: relative;

	& + & {
		&:before {
			position: absolute;
			height: 100%;
			width: 1px;
			background-color: ${colors.lightgrey};
			content: "";
			left: ${dim(-1)};
			bottom: 0;

			${mq.mdUp`
				left: ${dim(-2)};
			`}
		}
	}
`;

const EventsScroll = styled.div`
	${mq.mdUp`
		overflow: scroll;
		max-height: 96vh;
	`};
`;

const Events = styled(ContentItem)`
	grid-area: events;

	${mq.mdUp`
		grid-area: unset;
		grid-column: 1 / span 4;
	`};
`;

const Leaderboard = styled(ContentItem)`
	grid-area: leaderboard;

	${mq.mdUp`
		grid-area: unset;
		grid-column: 5 / span 2;
	`}
`;

const Posts = styled(ContentItem)`
	grid-area: posts;
	overflow: hidden;

	${mq.smDown`
		margin-top: ${dim(2)};
		padding-top: ${dim(2)};
		border-top: 1px solid ${colors.lightgrey};
	`}

	${mq.mdUp`
		grid-area: unset;
		grid-column: 7 / span 6;
	`}
`;

const Filtering = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const getOrder = reverse =>
	reverse === "true" ? ["sys_publishedAt_ASC"] : ["sys_publishedAt_DESC"];

const Race = ({ data }) => {
	const {
		racesCollection,
		keyEvents,
		liveLeaderboard,
		racePostsCollection,
		racePost
	} = data;

	const router = useRouter();
	const [mapPinned, setMapPinned] = useState();
	const [showLoadMore, setShowLoadMore] = useState(true);
	const [showLoadMoreEvents, setShowLoadMoreEvents] = useState(true);

	const [posts, setPosts] = useState([]);
	const [events, setEvents] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		setPosts(racePost ? [racePost] : racePostsCollection.items);
		setEvents(keyEvents.items);

		// Hide the load more buttons if rendering a single post
		setShowLoadMore(!racePost);
		setShowLoadMoreEvents(!racePost);
	}, [racePost, racePostsCollection, keyEvents]);

	const [race] = racesCollection.items;

	const handleOrderChange = event => {
		router.replace({
			pathname: router.pathname,
			query: {
				...router.query,
				reverse: event.target.value === "reverse"
			},
			shallow: false
		});
	};

	const handleMapPinned = pinned => {
		setMapPinned(pinned);
	};

	const handleLoadMore = async () => {
		try {
			const { slug, reverse } = router.query;
			const { data } = await client.query({
				variables: {
					slug: slug,
					limit: POST_PER_VIEW,
					skip: currentPage + 1,
					order: getOrder(reverse)
				},
				query: loadMoreQuery
			});

			await setCurrentPage(currentPage + 1);

			await setShowLoadMore(data.racePostsCollection.total > posts.length);
			await setPosts(prev => [...prev, ...data.racePostsCollection.items]);

			await setShowLoadMoreEvents(data.keyEvents.total > events.length);
			await setEvents(prev => [...prev, ...data.keyEvents.items]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Head>
				<title>{`${race.title} - DotWatcher.cc`}</title>

				<meta property="og:title" content={`${race.title} - DotWatcher.cc`} />
				<meta property="og:description" content={race.shortDescription} />
				<meta property="og:image" content={race.icon.url} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={`${race.title} - DotWatcher.cc`} />
				<meta name="twitter:description" content={race.shortDescription} />
				<meta name="twitter:image" content={race.icon.ur} />
				<meta name="description" content={race.shortDescription} />
				<meta name="twitter:label1" content="Location" />
				<meta name="twitter:data1" content={race.location} />
				<meta name="twitter:label2" content="Length" />
				<meta name="twitter:data2" content={race.length} />
				<meta name="twitter:label3" content="Elevation" />
				<meta name="twitter:data3" content={race.elevation} />
			</Head>

			<Header race={race} />

			<RaceIFrame
				race={race}
				mapPinned={mapPinned}
				setMapPinned={handleMapPinned}
			/>

			<Section>
				<Center>
					<H2>Coverage</H2>
				</Center>
			</Section>

			<Section>
				<ContentGrid>
					<Events>
						<H3>Key Events</H3>

						<EventsScroll>
							<KeyEvents
								events={events}
								handleLoadMore={handleLoadMore}
								showLoadMoreEvents={showLoadMoreEvents}
							/>
						</EventsScroll>
					</Events>

					<Leaderboard>
						<H3>Leaderboard</H3>
						{liveLeaderboard ? (
							<LiveLeaderboard leaderboard={liveLeaderboard} />
						) : (
							<StaticLeaderboard race={race} />
						)}
					</Leaderboard>

					<Posts>
						<H3>Events Feed</H3>
						<Filtering>
							<label>
								<span>Order: </span>

								<Select onChange={handleOrderChange}>
									<option value="a" selected={router.query.reverse !== "true"}>
										Newset First
									</option>
									<option
										value="reverse"
										selected={router.query.reverse === "true"}
									>
										Oldest First
									</option>
								</Select>
							</label>

							{router.query.post && (
								<Link
									href={`/race/${race.slug}?reverse=${router.query.reverse}#posts`}
									passHref
								>
									<a>View All</a>
								</Link>
							)}
						</Filtering>

						<PostFeed
							handleLoadMore={handleLoadMore}
							showLoadMore={showLoadMore}
							posts={posts}
						/>
					</Posts>
				</ContentGrid>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const { slug, reverse, post } = query;

	const order = getOrder(reverse);

	const racePost = post
		? `
		racePost: contentType2WKn6YEnZewu2ScCkus4As(id: "${post}") {
			...Post
		}`
		: "";

	try {
		const { data } = await client.query({
			variables: {
				slug,
				limit: POST_PER_VIEW,
				currentPost: post || "",
				skip: 0,
				order
			},
			query: gql`
				fragment Post on ContentType2WKn6YEnZewu2ScCkus4As {
					sys {
						firstPublishedAt
						id
					}
					title
					format
					body
					keyPost
					embed
					featuredImage {
						url
					}
				}

				query race(
					$slug: String
					$limit: Int
					$skip: Int
					$order: [ContentType2WKn6YEnZewu2ScCkus4AsOrder]
				) {
					racesCollection	: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						limit: 1
						where: { slug: $slug }
					) {
						items {
							length
							elevation
							title
							location
							raceDate
							riders
							terrain
							lastYearsWinner
							winnerLabel
							trackleadersRaceId
							raceEndDate
							slug
							shortDescription
							staticLeaderboard {
								sys {
									publishedAt
								}
								leadersCollection {
									items {
										name
									}
								}
							}
							icon {
								url
							}
						}
					}

					keyEvents: contentType2WKn6YEnZewu2ScCkus4AsCollection(
						limit: $limit
						skip: $skip
						order: $order
						where: { keyPost: true, race: { slug: $slug } }
					) {
						total
						limit
						skip
						items {
							sys {
								id
								firstPublishedAt
							}
							title
						}
					}

					racePostsCollection: contentType2WKn6YEnZewu2ScCkus4AsCollection(
						limit: $limit
						skip: $skip
						order: $order
						where: { race: { slug: $slug } }
					) {
						total
						limit
						skip
						items {
							...Post
						}
					}

					${racePost}
				}
			`
		});

		const leaderboard = async () => {
			try {
				const { data: leaderboard } = await axios({
					method: "get",
					url:
						data.racesCollection.items[0].trackleadersRaceId +
						"api/dotwatcher/",
					httpsAgent: new https.Agent({
						rejectUnauthorized: false
					}),
					headers: {
						"X-Apikey": process.env.TRACKLEADERS_API_KEY
					}
				});

				return leaderboard;
			} catch (error) {
				console.log(error);
				return false;
			}
		};

		return {
			props: {
				data: {
					...data,
					liveLeaderboard: await leaderboard()
				}
			}
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
};

export default Race;
