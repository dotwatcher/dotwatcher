import { Fragment } from "react";
import tachyons from "styled-components-tachyons";
import styled from "styled-components";
import withSeries from "../../data/withSeries";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getYear } from "date-fns";
import { useRouter } from "next/router";

import Instagram from "../../components/UI/Icons/instagram";
import Website from "../../components/UI/Icons/website";
import Twitter from "../../components/UI/Icons/twitter";
import Facebook from "../../components/UI/Icons/facebook";
import Richtext from "../../components/rich-text";
import Page from "../../components/shared/page";
import Header from "../../components/header";
import Footer from "../../components/footer";
import NextImage from "../../components/NextImage";
import mq from "../../utils/media-query";
import {
	P,
	H1,
	H2,
	H4,
	Div,
	A,
	Image,
	Li,
	Ul
} from "../../components/UI/Tachyons";

const Year = styled.li`
	${tachyons}
`;

const RaceGrid = styled.div`
	display: grid;
	grid-column-gap: var(--spacing-large);
	grid-row-gap: var(--spacing-medium);
	grid-template-columns: repeat(2, minmax(0, 1fr));
	grid-template-areas:
		"details details"
		"overview overview";

	${mq.mdUp`
		grid-template-areas: "overview details";
	`}
`;

const RaceDetails = styled.div`
	grid-area: details;
`;
const RaceOverview = styled.div`
	grid-area: overview;
`;

const EditionsGrid = styled.ul`
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-column-gap: var(--spacing-medium);
	grid-row-gap: var(--spacing-medium);
	text-align: center;
`;

const Winners = styled.div`
	border-bottom: 1px solid var(--light-gray);
`;

const WinnerRace = styled.div`
	margin: 0 var(--spacing-small);
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

const getLatestWinner = results =>
	results &&
	results.filter(r => !!r.position).sort((a, b) => a.position - b.position);

const Series = ({
	race,
	user,
	mensWinner,
	womensWinner,
	latestWinner,
	mostWins,
	pairsWinners,
	latestRace,
	...props
}) => {
	const router = useRouter();

	const raceName = race.fields ? race.fields.name : router.query.name;

	const raceReports = () =>
		race.fields.previousReports.filter(race => race.fields);

	const [pairAWinner, pairBWinner] = pairsWinners;

	const title = `${raceName} – Race Series - DotWatcher.cc`;

	const hero =
		race.fields &&
		race.fields.heroImage &&
		race.fields.heroImage.fields.file.url;

	return (
		<Fragment>
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

			{hero && (
				<Hero>
					<NextImage
						src={
							race.fields.heroImage.fields.file.url + "?w=2000&h=1000&fit=fill"
						}
						alt={raceName}
						title={race.fields.title}
						width={2000}
						height={1000}
					/>
					<HeroCredit>{race.fields.heroCredit}</HeroCredit>
				</Hero>
			)}

			<Div pa2 mt3 mt4_l mh6_l>
				<Div>
					<Link href="/results">
						<A
							db
							link
							near_black
							hover_blue
							pointer
							passHref
							title="Find more races"
						>
							← Find more races
						</A>
					</Link>
				</Div>

				<H1 f3 f1_l fw6 lh_title mb0>
					{raceName}
				</H1>

				<RaceGrid>
					<RaceDetails>
						<Winners>
							{race.fields && race.fields.fastestKnownTime && (
								<Fragment>
									<H4>Fastest Known Time: </H4>
									<p>{race.fields.fastestKnownTime}</p>
								</Fragment>
							)}

							<H4>Latest Winners ({latestWinner.year}): </H4>

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
						</Winners>

						<Ul mt_4>
							{race.fields && race.fields.website && (
								<Li dib>
									<A
										black
										hover_blue
										pointer
										href={race.fields.website}
										target="_blank"
									>
										<Website width={30} />
									</A>
								</Li>
							)}

							{race.fields && race.fields.instagram && (
								<Li dib ml4>
									<A
										black
										hover_blue
										pointer
										href={race.fields.instagram}
										target="_blank"
									>
										<Instagram width={30} />
									</A>
								</Li>
							)}

							{race.fields && race.fields.twitter && (
								<Li dib ml4>
									<A
										black
										hover_blue
										pointer
										href={race.fields.twitter}
										target="_blank"
									>
										<Twitter width={30} />
									</A>
								</Li>
							)}

							{race.fields && race.fields.facebook && (
								<Li dib ml4>
									<A
										black
										hover_blue
										pointer
										href={race.fields.facebook}
										target="_blank"
									>
										<Facebook width={30} />
									</A>
								</Li>
							)}
						</Ul>
					</RaceDetails>
					<RaceOverview>
						{race.fields && race.fields.description && (
							<P measure_wide f4 lh_copy>
								<Richtext source={race.fields.description} />
							</P>
						)}

						{race.fields && race.fields.previousReports && (
							<Fragment>
								<H2>Reports</H2>

								<EditionsGrid pb4 bb bw1 b__light_gray>
									{raceReports().map((race, index) => (
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
											<Link href={`/race/${race.fields.slug}`} passHref>
												<A
													db
													pa2
													link
													near_black
													data-id={race.id}
													title={`${raceName} Report ${getYear(
														race.fields.raceDate
													)}`}
												>
													{getYear(race.fields.raceDate)}
												</A>
											</Link>
										</Year>
									))}
								</EditionsGrid>
							</Fragment>
						)}
						{race.races && (
							<Fragment>
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
											<Link
												href={`/results/${race.year}/${race.slug}`}
												passHref
											>
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
							</Fragment>
						)}
					</RaceOverview>
				</RaceGrid>
			</Div>
		</Fragment>
	);
};

export default withSeries(Series);
