import { useState, Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import { compose } from "recompose";
import { isEmpty } from "lodash";

import Header from "../components/header";
import Page from "../components/shared/page";
import Footer from "../components/footer";
import { WithResults } from "../data/with-featured-results";
import { WithRiders } from "../data/with-riders";
import mq from "../utils/media-query";

const Div = styled.div`
	${tachyons}
`;

const H1 = styled.h1`
	${tachyons}
`;

const H3 = styled.h3`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Span = styled.span`
	${tachyons}
`;

const Li = styled.li`
	${tachyons}
`;

const RidersGrid = styled.ul`
	text-align: center;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: var(--spacing-large);
	grid-row-gap: var(--spacing-large);
	list-style-type: none;
	margin: 0;
	padding: 0;

	${mq.smUp`
		grid-template-columns: repeat(6, 1fr);
	`}
`;

const RaceWrapper = styled.ul`
	display: grid;
	grid-column-gap: var(--spacing-large);
	grid-row-gap: var(--spacing-large);
	list-style-type: none;
	padding: 0;
	margin: 0;

	${mq.smUp`
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
	`}
`;

const RaceYearsWrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	list-style-type: none;
	padding: 0;
	margin: 0;
	grid-column-gap: var(--spacing-small);
	grid-row-gap: var(--spacing-small);
	margin-top: var(--spacing-small);
	text-align: center;
`;

const Search = styled.div`
	position: sticky;
	top: 0;
`;

const Input = styled.input`
	width: 300px;
	display: inline-block;
	border: 2px solid var(--black);
	font-size: 20px;
	line-height: 23px;
	padding: 8px 12px;
	margin: var(--spacing-medium) 0;
`;

const Button = styled.button`
	${tachyons};
`;

const Results = props => {
	const [riders, setRiders] = useState([]);
	const [races, setRaces] = useState(props.races || {});
	const [searchValue, setSearchValue] = useState("");

	const handleClear = () => {
		setSearchValue("");
		setRaces(props.races);
		setRiders([]);
	};

	const handleChange = e => {
		let { value } = e.target;

		setSearchValue(value);

		value = value.toLowerCase();

		if (value.length < 3) {
			setRiders([]);
			setRaces(props.races);
			return;
		}

		let _riders = props.riders.results.filter(rider =>
			rider.name.toLowerCase().includes(value)
		);

		// Remove duplicates
		_riders = _riders.filter(
			(rider, index, self) =>
				index === self.findIndex(t => t.name === rider.name)
		);

		setRiders(_riders);

		let searchRaces = Object.keys(races).filter(race => {
			return race.toLowerCase().includes(value);
		});

		searchRaces = searchRaces.reduce((acc, curr) => {
			if (!curr) return acc;
			return {
				[curr]: props.races[curr],
				...acc
			};
		}, {});

		setRaces(searchRaces);
	};

	return (
		<Page>
			<Head>
				<title>Featured Results - DotWatcher.cc</title>
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

				<Search>
					<Input
						type="text"
						onChange={handleChange}
						placeholder="Find a race or rider"
						value={searchValue}
					/>
					<Button
						input_reset
						bg_light_gray
						hover_bg_lightest_blue
						f5
						tracked
						bn
						ttu
						ph3
						pv2
						lh_solid
						dib
						ml4
						type="button"
						onClick={handleClear}
					>
						Clear
					</Button>
				</Search>

				<Link href="/results" passHref>
					<A db link near_black hover_blue underline>
						See full results catalogue
					</A>
				</Link>

				{isEmpty(races) && isEmpty(riders) && (
					<H3>Could not find any results for "{searchValue}"</H3>
				)}

				{Object.keys(races).length > 0 && (
					<Fragment>
						<H1>Races</H1>
						<RaceWrapper>
							{Object.keys(races).map((race, i) => (
								<li key={race[race]}>
									<Span>{race}</Span>

									<RaceYearsWrapper>
										{Object.keys(races[race])
											.filter(x => x !== "slug")
											.map(year => {
												const raceSlug = races[race][year][0].slug;
												return (
													<Li
														key={race + year}
														dib
														hover_bg_lightest_blue
														bg_light_gray
														f4
														lh_copy
													>
														<Link
															href={`/results?year=${year}&race=${raceSlug}`}
															as={`/results/${year}/${raceSlug}`}
															passHref
														>
															<A db pa2 link near_black>
																{year}
															</A>
														</Link>
													</Li>
												);
											})}
									</RaceYearsWrapper>
								</li>
							))}
						</RaceWrapper>
					</Fragment>
				)}

				{riders.length > 0 && (
					<Fragment>
						<H1>Riders</H1>

						<RidersGrid>
							{riders.map(rider => (
								<Li key={rider}>
									<Link
										href={`/profile?name=${rider.name}`}
										as={`/profile/${rider.name}`}
										passHref
									>
										<A
											dib
											hover_bg_lightest_blue
											bg_light_gray
											f4
											lh_copy
											black
											pa2
											w_100
										>
											{rider.name}
										</A>
									</Link>
								</Li>
							))}
						</RidersGrid>
					</Fragment>
				)}
			</Div>

			<Footer />
		</Page>
	);
};

const enhance = compose(WithResults, WithRiders);

export default enhance(Results);
