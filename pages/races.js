import React, { Component, Fragment } from "react";
import Head from "next/head";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import Section from "@Components/UI/Section";
import RacePreview from "../components/race-preview";
import Calendar from "../components/calendar-feed";
import Footer from "../components/footer";
import { withRaces } from "../data/with-races";

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;

class Races extends Component {
	render() {
		const currentRaces = this.props.races.filter(
			race =>
				moment(race.data.raceEndDate).isAfter() &&
				race.data.calendarOnly !== true
		);
		const pastRaces = this.props.races.filter(race =>
			moment(race.data.raceEndDate).isBefore()
		);

		const futureRaces = this.props.races
			.filter(race => moment(race.data.raceEndDate).isAfter())
			.reverse();

		const PastHeading = styled.header`
			margin-top: ${currentRaces.length > 0 ? "var(--spacing-large)" : 0};
			@media screen and (min-width: 64em) {
				margin-top: ${currentRaces.length > 0
					? "var(--spacing-extra-large)"
					: 0};
			}
			${tachyons}
		`;

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
					<Div pb5>
						{currentRaces.length > 0 && (
							<Heading fl w_100 mb4 ph3>
								<H1 ma0 f4 fw6 ttu tracked bb bw1 b__light_gray pb1>
									Live coverage
								</H1>
							</Heading>
						)}

						{currentRaces.map(race => (
							<RacePreview key={race.sys.id} data={race.data} />
						))}

						<PastHeading fl w_100 mb4 ph3>
							<H1 ma0 f4 fw6 ttu tracked bb bw1 b__light_gray pb1>
								Past races
							</H1>
						</PastHeading>

						{pastRaces.map(race => (
							<RacePreview key={race.sys.id} data={race.data} />
						))}
					</Div>
				</Section>

				{/*<Div mt3 mt4_l ph5 ph3_l fl w_100 w_25_l>
					<Heading mb4>
						<H1 ma0 f4 fw6 ttu tracked bb bw1 b__light_gray pb1>
							Calendar
						</H1>
					</Heading>
					{futureRaces.length > 0 ? (
						<Calendar races={futureRaces} />
					) : (
						<p>We haven't quite got round to updating our calendar yet.</p>
					)}
					</Div>*/}
			</Fragment>
		);
	}
}

Races.propTypes = {
	races: PropTypes.array
};

Races.defaultProps = {
	races: []
};

export default withRaces(Races);
