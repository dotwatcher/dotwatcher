import { useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Header from "../components/header";
import Page from "../components/shared/page";
import Footer from "../components/footer";
import { WithResults } from "../data/with-featured-results";
import { FeaturedResultsTable } from "../components/FeaturedResults";

const ResultsGrid = styled.section`
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
`;

const Race = styled.div`
	width: 30%;
	flex-grow: 1;
	box-sizing: border-box;
	margin: 15px;
	justify-content: space-between;
	text-align: center;
`;

const RaceYears = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 15px;
`;
const RaceYear = styled.li`
	${tachyons};
	text-align: center;
	cursor: pointer;
`;
const Results = props => {
	const [selectedRace, setSelectedRace] = useState([]);

	const [raceName, raceYear] = selectedRace;

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

			<ResultsGrid>
				{Object.keys(props.races).map(race => (
					<Race key={race}>
						<h4>{race}</h4>

						<RaceYears>
							{Object.keys(props.races[race]).map(year => (
								<RaceYear
									dib
									hover_bg_lightest_blue
									bg_light_gray
									ba
									bw1
									b__white
									f4
									lh_copy
									key={year + race}
									onClick={() => setSelectedRace([race, year])}
								>
									{year}
								</RaceYear>
							))}
						</RaceYears>
					</Race>
				))}
			</ResultsGrid>
			{raceName && (
				<FeaturedResultsTable race={props.races[raceName][raceYear]} />
			)}
			<Footer />
		</Page>
	);
};

Results.propTypes = {
	allRaces: PropTypes.array
};

Results.defaultProps = {
	raceResultsByYear: []
};

export default WithResults(Results);
