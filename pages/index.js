import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dim from "@Utils/dim";
import Link from "next/link";
import { Fragment } from "react";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import H4 from "@Components/UI/H4";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import moment from "moment";
import Image from "next/image";
import colors from "@Utils/colors";

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: ${dim(2)};
`;

const Section = styled.section`
	margin-top: ${dim(2)};
	padding-top: ${dim(2)};

	& + & {
		border-top: 1px solid ${colors.lightgrey};
	}
`;

const Home = ({ data }) => {
	const {
		racesCollection,
		featureCollection,
		homepageNewCollection,
		featureCategoryCollection
	} = data;

	const [homepage] = homepageNewCollection.items;

	return (
		<Fragment>
			{featureCollection && (
				<Section>
					<Center>
						<H2>Recent Features</H2>
					</Center>
					<Grid>
						{featureCollection.items.slice(0, 4).map((feature, ind) => (
							<div key={ind}>
								{feature.featuredImage && (
									<Image
										src={feature.featuredImage.url}
										alt={feature.title}
										title={feature.title}
										width={760}
										height={500}
									/>
								)}

								<Link href={`/feature/${feature.slug}`} passHref>
									<a>
										<H4>{feature.title}</H4>
									</a>
								</Link>

								<P>{feature.excerpt}</P>

								{feature.contributor && (
									<Link
										href={`/contributor/${feature.contributor.slug}`}
										passHref
									>
										<a>
											<P>{feature.contributor.name}</P>
										</a>
									</Link>
								)}

								<p>{moment(feature.sys.publishedAt).format("MMM Do YYYY")}</p>
							</div>
						))}
					</Grid>
				</Section>
			)}

			<Section>
				<Center>
					<Link href="/features" passHref>
						<a>Read all our features</a>
					</Link>
				</Center>
			</Section>

			<Section>
				<Center>
					<H2>Welcome to DotWatcher.cc</H2>

					<H4>
						Dotwatcher.cc is the home of live updates, GPS tracking maps,
						editorial insight, and race results from the world of long-distance,
						self-supported bike racing.
					</H4>

					<Link href="/about#contributors" passHref>
						<a>
							<H4>Who Are We ?</H4>
						</a>
					</Link>
				</Center>
			</Section>

			{console.log(featureCategoryCollection)}

			{featureCategoryCollection && featureCategoryCollection.items.length && (
				<Section>
					{featureCategoryCollection.items.map((collection, ind) => (
						<Link href={`features/${collection.slug}`} passHref key={ind}>
							<a>
								<P>{collection.name}</P>
							</a>
						</Link>
					))}
				</Section>
			)}

			{homepage.favouriteRacesCollection &&
				homepage.favouriteRacesCollection.items.length && (
					<Section>
						{homepage.favouriteRacesCollection.items && (
							<Fragment>
								<Center>
									<H3>Our Favourite Race Series</H3>
								</Center>
								{homepage.favouriteRacesCollection.items.map((race, ind) => (
									<p key={ind}>{race.name}</p>
								))}
							</Fragment>
						)}
					</Section>
				)}

			{racesCollection && (
				<Section>
					<Center>
						<H2>Previous Races</H2>
					</Center>
					<Grid>
						{racesCollection.items.slice(0, 4).map((race, ind) => (
							<div key={ind}>
								<Link href={`/race/${race.slug}`} passHref>
									<a>
										<H4>{race.title}</H4>
									</a>
								</Link>

								<P>{race.shortDescription}</P>

								<p>{moment(race.raceDate).format("MMM Do YYYY")}</p>
							</div>
						))}
					</Grid>
				</Section>
			)}

			<Section>
				<Center>
					<Link href="/races" passHref>
						<a>Look back on more races</a>
					</Link>
				</Center>
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
							publishedAt
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
