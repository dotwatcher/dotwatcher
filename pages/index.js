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
		liveRaces
	} = data;

	const recentRaces = {
		...racesCollection,
		// Remove the number of races that are currently live
		items: racesCollection.items.slice(liveRaces.items.length)
	};

	const [homepage] = homepageNewCollection.items;

	return (
		<Fragment>
			<Title>
				<Center>
					<H1>Welcome to DotWatcher.cc</H1>
				</Center>
			</Title>

			{liveRaces.items.length > 0 && (
				<Section>
					<Center>
						<H2>Currently live events</H2>
					</Center>
					<LiveRaces liveRaces={liveRaces} />
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

	const { data } = await client.query({
		variables: {
			today: todayISO
		},
		query: gql`
			query homepage($today: DateTime) {
				featureCategoryCollection(limit: 10) {
					items {
						slug
						name
					}
				}

				featureCollection(limit: 5) {
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
				) {
					items {
						title
						slug
						shortDescription
						raceDate
					}
				}

				liveRaces: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
					limit: 5
					# where end is gte to today and stare is lte to today
					where: { raceEndDate_gte: $today, raceDate_lte: $today }
				) {
					items {
						title
						slug
						shortDescription
						raceDate
						raceEndDate
						liveBeforeStartDate
						icon {
							url
							title
						}
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
};

export default Home;
