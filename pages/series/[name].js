import { Fragment } from "react";
import { compose } from "recompose";
import tachyons from "styled-components-tachyons";
import styled from "styled-components";
import withSeries from "../../data/withSeries";
import React from "react";
import Head from "next/head";
import Link from "next/link";
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
	grid-template-columns: 50% 50%;
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
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: var(--spacing-medium);
	grid-row-gap: var(--spacing-medium);
	text-align: center;
`;

const Series = ({ race, user }) => {
	const raceReports = () =>
		race.fields.previousReports.filter(race => race.fields);

	return (
		<Page>
			<Head>
				<title>{race.fields.name} – DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${race.fields.name} – DotWatcher.cc`}
				/>
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
				<meta
					name="twitter:title"
					content={`${race.fields.name} – DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				*
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
					alt={race.fields.name}
					title={race.fields.title}
				/>
			)}

			<Div mt3 mt4_l mh6_l>
				<H1 f3 f1_l fw6 lh_title mb0>
					{race.fields.name}
				</H1>

				<RaceGrid>
					<RaceDetails>
						{race.fields.website && (
							<Fragment>
								<p>
									Website:
									<a href={race.fields.website} target="_blank">
										{race.fields.website}
									</a>
								</p>
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

						<H2>Reports</H2>
						<EditionsGrid pb4 bb bw1 b__light_gray>
							{race.fields.previousReports &&
								raceReports().map((race, index) => (
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
											href={`/race?slug=${race.fields.slug}`}
											as={`/race/${race.fields.slug}`}
											passHref
										>
											<A db pa2 link near_black data-id={race.id}>
												{race.fields.slug}
											</A>
										</Link>
									</Year>
								))}
						</EditionsGrid>

						<H2>Results</H2>
						<EditionsGrid pb4 bb bw1 b__light_gray>
							{race.races &&
								race.races.map((race, index) => (
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
											href={`/results?year=${race.year}&race=${race.slug}`}
											as={`/results/${race.year}/${race.slug}`}
											passHref
										>
											<A db pa2 link near_black data-id={race.id}>
												{race.year}
											</A>
										</Link>
									</Year>
								))}
						</EditionsGrid>
					</RaceOverview>
				</RaceGrid>
			</Div>
			<Footer />
		</Page>
	);
};

const enhance = compose(withSeries);

export default enhance(Series);
