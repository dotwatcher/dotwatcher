import { useState, Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import { compose } from "recompose";
import { isEmpty } from "lodash";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import Header from "../components/header";
import Page from "../components/shared/page";
import Footer from "../components/footer";
import WithFeaturedResults from "../data/with-featured-results";
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

const H2 = styled.h2`
	${tachyons}
`;

const A = styled.a`
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
	grid-template-columns: repeat(1, minmax(0, 1fr));

	${mq.smUp`
		grid-template-columns: repeat(2, minmax(0, 1fr));
	`}

	${mq.mdUp`
		grid-template-columns: repeat(3, minmax(0, 1fr));
	`}
`;

const RaceYearsWrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
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
	max-width: 300px;
	display: inline-block;
	border: 2px solid var(--black);
	font-size: 20px;
	line-height: 23px;
	padding: 8px 12px;
	margin-right: var(--spacing-large);
`;

const Button = styled.button`
	${tachyons};
`;

const HeadingWrap = styled(Div)`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-column-gap: var(--spacing-medium);
	border-bottom: 1px solid var(--light-gray);
	margin-bottom: var(--spacing-medium);
`;

const MoreResults = styled.div`
	margin-top: var(--spacing-large);
	display: flex;
	justify-content: space-between;
`;

const Results = props => {
	const { fields } = props;
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
		<>
			<Head>
				<title>{fields.title} - DotWatcher.cc</title>
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

			<Div mt3 mt4_l mh6_l>
				{fields.title && <H1>{fields.title}</H1>}

				<HeadingWrap>
					<Div>
						<div
							dangerouslySetInnerHTML={{
								__html: documentToHtmlString(fields.summary)
							}}
						/>
					</Div>

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
							type="button"
							onClick={handleClear}
						>
							Clear
						</Button>
					</Search>
				</HeadingWrap>

				{isEmpty(races) && isEmpty(riders) && (
					<H3>Could not find any results for "{searchValue}"</H3>
				)}

				{Object.keys(races).length > 0 && (
					<Fragment>
						<RaceWrapper>
							{Object.keys(races).map((race, i) => (
								<li key={i}>
									<Link
										href={{
											pathname: "/series/[name]/",
											query: {
												name: race
											}
										}}
										as={`/series/${race}`}
										passHref
									>
										<A black no_underline hover_underline hover_blue>
											<H2>{race}</H2>
										</A>
									</Link>

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

						<MoreResults>
							<Link href="/results">
								<A
									f4
									bg_blue
									ph3
									pv2
									mb3
									center
									tc
									white
									tracked
									ttl
									small_caps
									ba
									bw1
									b__blue
									dib
									pointer
								>
									{fields.moreResultsButton}
								</A>
							</Link>
						</MoreResults>
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
		</>
	);
};

const enhance = compose(WithFeaturedResults, WithRiders);

export default enhance(Results);
