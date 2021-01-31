import { Fragment } from "react";
import tachyons from "styled-components-tachyons";
import styled from "styled-components";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getYear } from "date-fns";
import { useRouter } from "next/router";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import axios from "axios";
import apiUrl from "@Utils/api-url";
import Image from "next/image";
import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H4 from "@Components/UI/H4";
import P from "@Components/UI/P";

import Instagram from "@Components/UI/Icons/instagram";
import Website from "@Components/UI/Icons/website";
import Twitter from "@Components/UI/Icons/twitter";
import Facebook from "@Components/UI/Icons/facebook";
import mq from "@Utils/media-query";
import dim from "@Utils/dim";
import Richtext from "../../components/rich-text";
import { A } from "../../components/UI/Tachyons";

const Year = styled.li`
	${tachyons}
`;

const Header = styled.div`
	max-width: 1600px;
	text-align: center;
`;

const RaceDetails = styled.div`
	grid-area: details;
`;

const EditionsGrid = styled.ul`
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-column-gap: ${dim(2)};
	grid-row-gap: ${dim(2)};
	text-align: center;
`;

const WinnersWrap = styled.div`
	max-width: 1600px;
	margin: 0 auto;
	${mq.mdUp`
		display: flex;
		justify-content: center;
		column-gap: ${dim(2)}
	`}
`;

const WinnerRace = styled.div`
	margin: 0 ${dim()};
	display: inline-block;
`;

const Hero = styled.div`
	position: relative;
	display: block;
	text-align: center;
`;

const HeroCredit = styled.p`
	position: absolute;
	bottom: 0;
	left: 0;
	font-size: 16px;
	margin: 5px;
`;

const Social = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	text-align: center;
	li {
		margin: 0 ${dim()};
		display: inline-block;
	}
`;

const Series = ({
	race,
	mensWinner,
	womensWinner,
	latestWinner,
	mostWins,
	pairsWinners
}) => {
	const router = useRouter();

	const raceName = race ? race.name : router.query.name;

	const [pairAWinner, pairBWinner] = pairsWinners;

	const title = `${raceName} – Race Series - DotWatcher.cc`;

	const hero = race && race.heroImage && race.heroImage.url;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta property="og:title" content={title} />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta property="og:image" content={hero} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={title} />
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>

				<meta property="og:image" content={hero} />
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>

			<Section>
				<Header>
					<Center>
						<H1>{raceName}</H1>

						{race.description && (
							<P>
								<Richtext source={race.description.json} />
							</P>
						)}
					</Center>
				</Header>
			</Section>

			<Section>
				<Social>
					{race.website && (
						<li>
							<A href={race.website} target="_blank">
								<Website width={30} />
							</A>
						</li>
					)}

					{race.instagram && (
						<li>
							<A href={race.instagram} target="_blank">
								<Instagram width={30} />
							</A>
						</li>
					)}

					{race.twitter && (
						<li>
							<A href={race.twitter} target="_blank">
								<Twitter width={30} />
							</A>
						</li>
					)}

					{race.facebook && (
						<li>
							<A href={race.facebook} target="_blank">
								<Facebook width={30} />
							</A>
						</li>
					)}
				</Social>
			</Section>

			{hero && (
				<Section>
					<Hero>
						<Image
							src={race.heroImage.url + "?w=2000&h=1000&fit=fill"}
							alt={raceName}
							title={race.title}
							width={2000}
							height={1000}
						/>
						<HeroCredit>{race.heroCredit}</HeroCredit>
					</Hero>
				</Section>
			)}

			<Section>
				<RaceDetails>
					<div>
						{latestWinner && (
							<Center>
								<H2>Latest Winners ({latestWinner.year})</H2>
							</Center>
						)}

						{race.fastestKnownTime && (
							<Center>
								<H4>Fastest Known Time: {race.fastestKnownTime}</H4>
							</Center>
						)}

						<WinnersWrap>
							{latestWinner && (
								<P>
									Overall:{" "}
									<Link href={`/profile/${latestWinner.name}`} passHref>
										<A
											link
											dark_gray
											hover_blue
											underline
											title={latestWinner.name}
										>
											{latestWinner.name}
										</A>
									</Link>
								</P>
							)}

							{mensWinner && (
								<P>
									Men's:{" "}
									<Link href={`/profile/${mensWinner.name}`} passHref>
										<A
											link
											dark_gray
											hover_blue
											underline
											title={mensWinner.name}
										>
											{mensWinner.name}
										</A>
									</Link>
								</P>
							)}

							{womensWinner && (
								<P>
									Women's:{" "}
									<Link href={`/profile/${womensWinner.name}`} passHref>
										<A
											link
											dark_gray
											hover_blue
											underline
											title={womensWinner.name}
										>
											{womensWinner.name}
										</A>
									</Link>
								</P>
							)}

							{pairAWinner && (
								<P>
									Pairs:{" "}
									<Link href={`/profile/${pairAWinner.name}`} passHref>
										<A
											link
											dark_gray
											hover_blue
											underline
											title={pairAWinner.name}
										>
											{pairAWinner.name}
										</A>
									</Link>{" "}
									&{" "}
									<Link href={`/profile/${pairBWinner.name}`} passHref>
										<A
											link
											dark_gray
											hover_blue
											underline
											title={pairBWinner.name}
										>
											{pairBWinner.name}
										</A>
									</Link>
								</P>
							)}

							{!!mostWins && (
								<Fragment>
									<H4>Most Wins ({mostWins[0].races.length}):</H4>
									{mostWins.map((winner, i) => (
										<Fragment key={i}>
											<P>
												<Link href={`/profile/${winner.name}`}>
													<A
														link
														dark_gray
														underline
														pointer
														hover_blue
														title={winner.name}
													>
														{winner.name}
													</A>
												</Link>
												:
												{winner.races.map((r, i) => (
													<WinnerRace key={i}>
														<Link
															href={`/results/[year]/[race]`}
															as={`/results/${r.year}/${r.slug}`}
															passHref
														>
															<A
																link
																dark_gray
																underline
																pointer
																hover_blue
																title={`${raceName}: ${r.year}`}
															>
																{r.year}
															</A>
														</Link>
													</WinnerRace>
												))}
											</P>
										</Fragment>
									))}
								</Fragment>
							)}
						</WinnersWrap>
					</div>
				</RaceDetails>
			</Section>

			{race.previousReportsCollection.items.length > 0 && (
				<Section>
					<H2>Reports</H2>

					<EditionsGrid pb4 bb bw1 b__light_gray>
						{race.previousReportsCollection.items.map((race, index) => (
							<Year
								dib
								hover_bg_lightest_blue
								bg_light_gray
								ba
								bw1
								b__white
								f4
								lh_copy
								key={index}
							>
								<Link href={`/race/${race.slug}`} passHref>
									<A
										db
										pa2
										link
										near_black
										data-id={race.sys.id}
										title={`${raceName} Report ${getYear(race.raceDate)}`}
									>
										{getYear(race.raceDate)}
									</A>
								</Link>
							</Year>
						))}
					</EditionsGrid>
				</Section>
			)}

			{race.races && (
				<Section>
					<H2>Results</H2>
					<EditionsGrid pb4 bb bw1 b__light_gray>
						{race.races.map((race, index) => (
							<Year
								dib
								hover_bg_lightest_blue
								bg_light_gray
								ba
								bw1
								b__white
								f4
								lh_copy
								key={index}
							>
								<Link href={`/results/${race.year}/${race.slug}`} passHref>
									<A
										db
										pa2
										link
										near_black
										data-id={race.id}
										title={`${raceName}: ${race.year}`}
									>
										{race.year}
									</A>
								</Link>
							</Year>
						))}
					</EditionsGrid>
				</Section>
			)}
		</>
	);
};

export const getServerSideProps = async ctx => {
	const getLatestWinner = results => {
		return results
			? results
					.filter(r => !!r.position)
					.sort((a, b) => a.position - b.position)
			: [];
	};

	const { name } = ctx.query;

	try {
		const { data: res } = await client.query({
			variables: {
				name
			},
			query: gql`
				query getSeries($name: String) {
					raceSeriesCollection(
						limit: 1
						where: { name: $name }
						order: sys_firstPublishedAt_DESC
					) {
						items {
							race
							name
							heroCredit
							fastestKnownTime
							website
							instagram
							twitter
							facebook
							previousReportsCollection {
								items {
									sys {
										id
									}
									slug
									raceDate
								}
							}
							description {
								json
							}
							heroImage {
								url
							}
						}
					}
				}
			`
		});

		const { raceSeriesCollection } = res;

		let [race] = raceSeriesCollection.items;

		const { data } = await axios({
			url: apiUrl(`/api/race-series?name=${name}`, ctx.req),
			method: "get"
		});

		race = { ...race, races: data.races };

		const [latestRace] =
			race.races &&
			race.races.length > 0 &&
			race.races.sort((a, b) => b.year - a.year);

		const getLatestWinnerByClass = classification => {
			const results = latestRace.results.filter(
				r => r.class.toLowerCase() === classification.toLowerCase()
			);

			return getLatestWinner(results);
		};

		const getLatestWinnerByGender = gender => {
			const results = latestRace.results.filter(
				r =>
					r.category.toLowerCase() === gender.toLowerCase() &&
					r.class !== "PAIR"
			);

			return getLatestWinner(results);
		};

		const getLatestOverallWinner = race => {
			const results = race.results.filter(r => r.class === "SOLO");

			return getLatestWinner(results);
		};

		const getModalWinners = () => {
			let winners = race.races.map(race => getLatestOverallWinner(race)[0]);

			// Create objects of winners races
			const winsObj = winners.reduce((acc, curr) => {
				if (!curr) return acc;
				return {
					...acc,
					[curr.name]: acc[curr.name] ? [...acc[curr.name], curr] : [curr]
				};
			}, {});

			// Sort in win order
			let [mostWinsRider] = Object.keys(winsObj).sort(
				(a, b) => winsObj[b].length - winsObj[a].length
			);

			// Get the highest wins count
			const mostWinsRiderQty = winsObj[mostWinsRider].length;

			if (mostWinsRiderQty <= 1) return false;

			// Check if there are multiple with the same amount of wins
			winners = Object.keys(winsObj).filter(
				winner => winsObj[winner].length === mostWinsRiderQty,
				[]
			);

			return winners.map(w => ({ name: w, races: winsObj[w] }));
		};

		const [pairAWinner = null, pairBWinner = null] = getLatestWinnerByClass(
			"PAIR"
		);
		const [mensWinner = null] = getLatestWinnerByGender("MEN");
		const [womensWinner = null] = getLatestWinnerByGender("WOMEN");
		const [latestWinner = null] = getLatestOverallWinner(latestRace);
		const mostWins = getModalWinners();

		return {
			props: {
				race,
				mensWinner,
				womensWinner,
				latestWinner,
				mostWins,
				latestRace,
				pairsWinners: [pairAWinner, pairBWinner]
			}
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
};

export default Series;
