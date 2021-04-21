import Head from "next/head";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dim from "@Utils/dim";
import Link from "next/link";
import { Fragment } from "react";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H4 from "@Components/UI/H4";
import A from "@Components/UI/A";
import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";

import {
	LatestFeatures,
	RecentRaces,
	RaceSeries,
	LiveRaces,
	FeatureCategories
} from "@Components/New/Homepage";

const TitleSection = styled(Section)`
	padding: ${dim(2)} ${dim(2)} 0;

	${Center} {
		max-width: 900px;
		margin: 0 auto;
	}
`;

const Title = styled(Section)`
	margin-top: ${dim()};
`;

const Home = ({ data }) => {
	const {
		racesCollection,
		featureCollection,
		homepageNewCollection,
		featureCategoryCollection,
		liveRaces,
		upcomingRaces
	} = data;

	const recentRaces = {
		...racesCollection,
		// Remove the number of races that are currently live
		items: racesCollection.items.slice(liveRaces.items.length)
	};

	const showcaseRaces = {
		items: [...liveRaces.items, ...upcomingRaces.items].filter(
			(value, index, self) =>
				self.findIndex(m => m.slug === value.slug) === index
		)
	};

	const [homepage] = homepageNewCollection.items;

	return (
		<Fragment>
			<Head>
				<title>Long distance bike race coverage – DotWatcher.cc</title>
				<meta
					property="og:title"
					content="Long distance bike race coverage – DotWatcher.cc"
				/>
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content="Long distance bike race coverage – DotWatcher.cc"
				/>
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>

			<Title>
				<Center>
					<H1>Welcome to DotWatcher.cc</H1>
				</Center>
			</Title>

			{showcaseRaces.items.length > 0 && (
				<Section>
					<Center>
						<H2>Live Races</H2>
					</Center>
					<LiveRaces liveRaces={showcaseRaces} />
				</Section>
			)}

			{recentRaces && recentRaces.items.length > 0 && (
				<Section>
					<RecentRaces racesCollection={recentRaces} />
				</Section>
			)}
			<Section>
				<Center>
					<Link href="/races" passHref>
						<A>Look back on more races</A>
					</Link>
				</Center>
			</Section>

			<TitleSection>
				<Center>
					<H4>
						DotWatcher.cc is the home of{" "}
						<Link href="/races" passHref>
							<A title="live updates">live updates</A>
						</Link>
						,{" "}
						<Link href="/races" passHref>
							<A title="GPS tracking maps">GPS tracking maps</A>
						</Link>
						,{" "}
						<Link href="/features" passHref>
							<A title="editorial insight">editorial insight</A>
						</Link>
						, and{" "}
						<Link href="/results" passHref>
							<A title="race results">race results</A>
						</Link>{" "}
						from the world of long-distance, self-supported bike racing.
					</H4>
				</Center>
				<Center>
					<Link href="/about#contributors" passHref>
						<H4>
							<A title="Who are we?">Who Are We ?</A>
						</H4>
					</Link>
				</Center>
			</TitleSection>

			{homepage.favouriteRacesCollection &&
				homepage.favouriteRacesCollection.items.length > 0 && (
					<Section>
						<RaceSeries
							favouriteRacesCollection={homepage.favouriteRacesCollection}
						/>
					</Section>
				)}

			{featureCollection && featureCollection.items.length > 0 && (
				<Section>
					<LatestFeatures featureCollection={featureCollection} />
				</Section>
			)}

			<Section>
				<FeatureCategories
					featureCategoryCollection={featureCategoryCollection}
				/>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async () => {
	const today = new Date();
	const todayISO = today.toISOString();

	try {
		const { data } = await client.query({
			variables: {
				today: todayISO,
				preview: !!process.env.CONTENTFUL_PREVIEW
			},
			query: gql`
				fragment liveRace on ContentType5KMiN6YPvi42IcqAuqmcQe {
					title
					slug
					shortDescription
					raceDate
					raceEndDate
					liveBeforeStartDate
					heroImage {
						url
						title
					}
					icon {
						url
						title
					}
				}
				query homepage($today: DateTime, $preview: Boolean) {
					featureCategoryCollection(
						limit: 10
						order: sys_firstPublishedAt_DESC
						preview: $preview
					) {
						items {
							slug
							name
						}
					}

					featureCollection(limit: 5, order: sys_firstPublishedAt_DESC) {
						items {
							sys {
								firstPublishedAt
							}
							title
							excerpt
							contributor {
								name
								slug
							}
							slug
							featuredImage {
								url
								title
							}
						}
					}

					homepageNewCollection(limit: 1) {
						items {
							favouriteRacesCollection(limit: 10) {
								items {
									race
									name
									description {
										json
									}
									heroImage {
										title
										url
									}
								}
							}
						}
					}

					# Contentful isn't pulling through the actual content model name.
					racesCollection: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						limit: 5
						where: { raceDate_lte: $today }
						order: sys_firstPublishedAt_DESC
					) {
						items {
							title
							slug
							shortDescription
							raceDate
							icon {
								url
							}
						}
					}

					liveRaces: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						limit: 5
						# where end is gte to today and stare is lte to today
						where: { raceEndDate_gte: $today, raceDate_lte: $today }
					) {
						items {
							...liveRace
						}
					}

					upcomingRaces: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						preview: $preview
						limit: 5
						where: { liveBeforeStartDate: true, raceDate_gte: $today }
					) {
						items {
							...liveRace
						}
					}
				}
			`
		});

		return {
			props: {
				data
			}
		};
	} catch (error) {
		console.log(error);

		return {
			notFound: true
		};
	}
};

export default Home;
