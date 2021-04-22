import React, { Component, Fragment } from "react";
import Head from "next/head";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import Calendar from "../components/calendar-feed";

import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import { gql } from "@apollo/client";
import client from "@Utils/apollo";
import Preview from "@ComponentsNew/Races/preview";
import dim from "@Utils/dim";
import colors from "@Utils/colors";

const Heading = styled.header`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const Race = styled.div`
	& + & {
		margin-top: ${dim(2)};
		padding-top: ${dim(2)};
		border-top: 1px solid ${colors.lightgrey};
	}
`;

const RacesRows = styled.div``;

const Races = ({ data }) => {
	return (
		<Fragment>
			<Head>
				<title>Races - DotWatcher.cc</title>

				<meta property="og:title" content="Races - DotWatcher.cc" />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<Section>
				<Center>
					<H1>Races</H1>
				</Center>
			</Section>

			{data.liveRaceCollection.items.length > 0 && (
				<Section>
					<Center>
						<H2>Live coverage</H2>
					</Center>

					{data.liveRaceCollection.items.map((race, ind) => (
						<Race>
							<Preview key={ind} race={race} button="View live coverage" />
						</Race>
					))}
				</Section>
			)}

			{console.log(data)}

			{data.upcomingRaceCollection.items.length > 0 && (
				<Section>
					<Center>
						<H2>Upcoming races</H2>
					</Center>

					{data.upcomingRaceCollection.items.map((race, ind) => (
						<Race>
							<Preview key={ind} race={race} button="View preview" />
						</Race>
					))}
				</Section>
			)}

			<Section>
				<Center>
					<H2>Past races</H2>
				</Center>
			</Section>

			<RacesRows>
				{data.pastRacesCollection.items.map((race, ind) => (
					<Race>
						<Preview key={ind} race={race} />
					</Race>
				))}
			</RacesRows>
		</Fragment>
	);
};

export const getServerSideProps = async () => {
	try {
		const today = new Date();
		const todayISO = today.toISOString();

		const { data } = await client.query({
			variables: {
				today: todayISO,
				preview: !!process.env.CONTENTFUL_PREVIEW
			},
			query: gql`
				fragment race on ContentType5KMiN6YPvi42IcqAuqmcQe {
					title
					slug
					raceDate
					shortDescription
					raceDate
					icon {
						url
					}
					location
					length
					elevation
					riders
					lastYearsWinner
					terrain
				}

				query getRaces($today: DateTime, $preview: Boolean) {
					pastRacesCollection: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						preview: $preview
						where: { raceEndDate_lte: $today }
						order: sys_firstPublishedAt_DESC
					) {
						items {
							...race
						}
					}

					liveRaceCollection: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						preview: $preview
						where: { raceEndDate_gte: $today, raceDate_lte: $today }
					) {
						items {
							...race
						}
					}

					upcomingRaceCollection: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						preview: $preview
						where: { raceDate_gt: $today, calendarOnly: false }
					) {
						items {
							...race
						}
					}
				}
			`
		});

		return { props: { data } };
	} catch (error) {
		console.log(error);

		return {
			notFound: true
		};
	}
};

export default Races;
