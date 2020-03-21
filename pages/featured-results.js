import { useState, Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import { compose } from "recompose";

import Header from "../components/header";
import Page from "../components/shared/page";
import Footer from "../components/footer";
import { WithResults } from "../data/with-featured-results";
import { WithRiders } from "../data/with-riders";
import ResultsFilter from "../components/results-index/results-filter";

const Div = styled.div`
	${tachyons}
`;

const H1 = styled.h1`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Span = styled.span`
	${tachyons}
`;

const RaceWrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const RaceYearsWrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const Results = props => {
	const [riders, setRiders] = useState(
		props.riders ? props.riders.results : []
	);
	const [races, setRaces] = useState(props.races || {});
	const [inputValue, setinputValue] = useState("");

	const handleChange = e => {
		let { value } = e.target;
		value = value.toLowerCase();

		if (value.length < 3) return;

		setinputValue(value);

		setRiders(riders.filter(rider => rider.name.includes(value)));

		let _races = Object.keys(races).filter(race => {
			return race.toLowerCase().includes(value);
		});

		_races = _races.reduce((acc, curr) => {
			if (!curr) return acc;
			return {
				[curr]: props.races[curr],
				...acc
			};
		}, {});

		debugger;

		setRaces(_races);
	};

	console.log("races ", races);
	return (
		<Page>
			<Head>
				<title>Results - DotWatcher.cc</title>
				<link rel="canonical" href={`https://dotwatcher.cc/featured-results`} />
				<meta
					property="og:title"
					content={`Featured Results - DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content="A history of results from the ultra-cycling world, in one database."
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
					content={`Featured Results - DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content="A history of results from the ultra-cycling world, in one database."
				/>
				<meta
					name="description"
					content="A history of results from the ultra-cycling world, in one database."
				/>
			</Head>
			<Header title="dotwatcher.cc" />

			<Div mt3 mt4_l mh6_l>
				<H1>Featured Results</H1>

				<Link href="/results" passHref>
					<A db link near_black hover_blue>
						← All results
					</A>
				</Link>

				<input type="text" onChange={handleChange} />

				<H1>Races</H1>

				{Object.keys(races).length > 0 && (
					<RaceWrapper>
						{Object.keys(races).map((race, i) => (
							<li key={race[race]}>
								<Span pl2>{race}</Span>

								<RaceYearsWrapper>
									{Object.keys(races[race])
										.filter(x => x !== "slug")
										.map(year => (
											<li key={race + year}>
												<Link
													href={`/results?year=${year}&race=${races[race].slug}`}
													as={`/results/${year}/${races[race].slug}`}
													passHref
												>
													<A db pa2 link near_black>
														{year}
													</A>
												</Link>
											</li>
										))}
								</RaceYearsWrapper>
							</li>
						))}
					</RaceWrapper>
				)}

				<H1>Riders</H1>

				{riders.map(rider => (
					<p>{rider.name}</p>
				))}
			</Div>

			<Footer />
		</Page>
	);
};

const enhance = compose(WithResults, WithRiders);

export default enhance(Results);
