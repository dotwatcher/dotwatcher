import { Fragment } from "react";
import { compose } from "recompose";
import tachyons from "styled-components-tachyons";
import styled from "styled-components";
import withSeries from "../../data/withSeries";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getYear } from "date-fns";

import Richtext from "../../components/rich-text";
import Page from "../../components/shared/page";
import Header from "../../components/header";
import Footer from "../../components/footer";
import mq from "../../utils/media-query";

const H1 = styled.h1`
	${tachyons}
`;

const H2 = styled.h2`
	${tachyons}
`;

const H4 = styled.h2`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Img = styled.img`
	${tachyons}
`;

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
	latestRace
}) => {
	const raceName = race.fields.name;

	const raceReports = () =>
		race.fields.previousReports.filter(race => race.fields);

	const [pairAWinner, pairBWinner] = pairsWinners;

	return (
		<Page>
			<Head>
				<title>{raceName} – DotWatcher.cc</title>
				<meta property="og:title" content={`${raceName} – DotWatcher.cc`} />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content={
						"https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={`${raceName} – DotWatcher.cc`} />
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>

				<meta
					property="og:image"
					content={
						"https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>
			
			<Header user={user} title="dotwatcher.cc" />

			{race.fields.heroImage && race.fields.heroImage.fields.file.url && (
				<Img
					w100
					src={race.fields.heroImage.fields.file.url + "?w=1500"}
					alt={raceName}
					title={race.fields.title}
				/>
			)}

			<Div pa2 mt3 mt4_l mh6_l>
				<H1 f3 f1_l fw6 lh_title mb0>
					{raceName}
				</H1>

				<RaceGrid>
					<RaceDetails>
						<Winners>
							
							{race.fields.fastestKnownTime && (
								<Fragment>
									<H4>Fastest Known Time: </H4>	
									<p>{race.fields.fastestKnownTime}</p>
								</Fragment>
							)}
							
							<H4>Latest Winners ({latestWinner.year}): </H4>

							{latestWinner && (
								<Fragment>
									<P>
										Overall:{" "}
										<Link
											href={`/profile/${latestWinner.name}`}
											passHref
										>
											<A
												link
												dark_gray
												hover_gray
												underline
												title={latestWinner.name}
											>
												{latestWinner.name}
											</A>
										</Link>
									</P>
								</Fragment>
							)}

							{mensWinner && (
								<Fragment>
									<P>
										Men's:{" "}
										<Link
											href={`/profile/${mensWinner.name}`}
											passHref
										>
											<A
												link
												dark_gray
												hover_gray
												underline
												title={mensWinner.name}
											>
												{mensWinner.name}
											</A>
										</Link>
									</P>
								</Fragment>
							)}

							{womensWinner && (
								<Fragment>
									<P>
										Women's:{" "}
										<Link
											href={`/profile/${womensWinner.name}`}
											passHref
										>
											<A
												link
												dark_gray
												hover_gray
												underline
												title={womensWinner.name}
											>
												{womensWinner.name}
											</A>
										</Link>
									</P>
								</Fragment>
							)}

							{pairAWinner && (
								<Fragment>
									<P>
										Pairs:{" "}
										<Link
											href={`/profile/${pairAWinner.name}`}
											passHref
										>
											<A
												link
												dark_gray
												hover_gray
												underline
												title={pairAWinner.name}
											>
												{pairAWinner.name}
											</A>
										</Link>{" "}
										&{" "}
										<Link
											href={`/profile/${pairBWinner.name}`}
											passHref
										>
											<A
												link
												dark_gray
												hover_gray
												underline
												title={pairBWinner.name}
											>
												{pairBWinner.name}
											</A>
										</Link>
									</P>
								</Fragment>
							)}

							{!!mostWins && (
								<Fragment>
									<H4>Most Wins ({mostWins[0].races.length}):</H4>
									{mostWins.map((winner, i) => {
										return (
											<Fragment key={i}>
												<P>
													<Link href={`/profile/${winner.name}`}>
														<A
															link
															dark_gray
															underline
															pointer
															hover_gray
															title={winner.name}
														>
															{winner.name}:
														</A>
													</Link>
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
																	hover_gray
																	title={`${raceName}: ${r.year}`}
																>
																	{r.year}
																</A>
															</Link>
														</WinnerRace>
													))}
												</P>
											</Fragment>
										);
									})}
								</Fragment>
							)}
						</Winners>

						{race.fields.website && (
							<Fragment>
								<P>
									<A href={race.fields.website} target="_blank">
										{race.fields.website}
									</A>
								</P>
							</Fragment>
						)}

						{race.fields.instagram && (
							<Fragment>
								<p>
									Instagram:
									<a href={race.fields.instagram} target="_blank">
										{race.fields.instagram}
									</a>
								</p>
							</Fragment>
						)}
					</RaceDetails>
					<RaceOverview>
						{race.fields.description && (
							<P measure_wide f4 lh_copy>
								<Richtext source={race.fields.description} />
							</P>
						)}

						{race.fields.previousReports && (
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
											<Link
												href={`/race/${race.fields.slug}`}
												passHref
											>
												<A
													db
													pa2
													link
													near_black
													data-id={race.id}
													title={`${raceName} Report ${getYear(race.fields.raceDate)}`}
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
			<Footer />
		</Page>
	);
};

const enhance = compose(withSeries);

export default enhance(Series);
