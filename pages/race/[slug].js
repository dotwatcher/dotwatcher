// /race/:slug
// /race/:slug?showMap=1
// /race/:slug?reverse=true
// /race/:slug?post=C83xOIsWoe76I8ib4ggmN#events -> shows a single post
// /race/:slug#posts -> to link directly to the top of the events feed
// /race/:slug#[:postid] -> to link directly to a specific post (it must be in the current data set)

import Head from "next/head";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import P from "@Components/UI/P";
import H3 from "@Components/UI/H3";
import H2 from "@Components/UI/H2";
import Button from "@Components/UI/Button";
import Center from "@Components/UI/Center";
import { useRouter } from "next/router";
import Link from "next/link";
import Pusher from "pusher-js";

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

const POST_PER_VIEW = 10;

const pusher = new Pusher(process.env.PUSHER_KEY, {
	cluster: "eu",
	encrypted: true
});
const channel = pusher.subscribe("dotwatcher");

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

const NewPostAlert = styled(Button)`
	position: fixed;
	top: ${dim()};
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
`;
const getOrder = reverse =>
	reverse === "true"
		? ["sys_firstPublishedAt_ASC"]
		: ["sys_firstPublishedAt_DESC"];

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
	const [showNewPostAlert, setShowNewPostAlert] = useState(false);

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

	useEffect(() => {
		channel.bind("new-post", newPostEvent => setShowNewPostAlert(true));

		() => channel.unbind("new-post");
	}, []);

	const [race] = racesCollection.items;

	const handleNewPostAlertClick = async () => {
		try {
			const { slug } = router.query;
			const { data } = await client.query({
				variables: {
					slug,
					limit: POST_PER_VIEW
				},
				query: loadMoreQuery
			});

			await setShowLoadMore(data.racePostsCollection.total > posts.length);
			await setPosts(data.racePostsCollection.items);
			await setShowLoadMoreEvents(data.keyEvents.total > events.length);
			await setEvents(data.keyEvents.items);
		} catch (error) {
			console.log(error);
		} finally {
			setShowNewPostAlert(false);
		}
	};

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

			{showNewPostAlert && (
				<NewPostAlert onClick={handleNewPostAlertClick}>
					There are new updates
				</NewPostAlert>
			)}

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

						{events.length > 0 ? (
							<EventsScroll>
								<KeyEvents
									events={events}
									handleLoadMore={handleLoadMore}
									showLoadMoreEvents={showLoadMoreEvents}
								/>
							</EventsScroll>
						) : (
							<P>Check back soon for some key moments in the race.</P>
						)}
					</Events>

					<Leaderboard>
						<H3>Leaderboard</H3>

						{race.resultsSlug && (
							<P>
								<Link href={`/results/${race.resultsSlug}`} passHref>
									<a title="View full resutlts">View full resutlts</a>
								</Link>
							</P>
						)}

						{liveLeaderboard ? (
							<LiveLeaderboard leaderboard={liveLeaderboard} />
						) : race.staticLeaderboard ? (
							<StaticLeaderboard race={race} />
						) : (
							<P>
								We are yet to release an up to date leaderboard. Please check
								back soon.
							</P>
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
				order,
				preview: !!process.env.CONTENTFUL_PREVIEW
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
					$preview: Boolean
				) {
					racesCollection	: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						limit: 1
						preview: $preview
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
							website
							lastYearsWinner
							winnerLabel
							trackleadersRaceId
							raceEndDate
							slug
							shortDescription
							whatsAppId
							resultsSlug
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
						preview: $preview
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
						preview: $preview
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

		if (data.racesCollection.items.length <= 0) {
			return {
				notFound: true
			};
		}

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
