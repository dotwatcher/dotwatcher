import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import ResultsSummary from "../results-summary";
import RiderSummary from "../Results/rider-summary";
import ResultsContribute from "../results-contribute";
import ResultsFilter from "./results-filter";

const Div = styled.div`
	${tachyons}
`;
const Header = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;

const Grid = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
	${tachyons}
`;

class ResultsIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredEvent: ""
		};
		this.setFilteredRace = this.setFilteredRace.bind(this);
	}

	setFilteredRace(id) {
		this.setState({
			filteredEvent: id
		});
	}

	render() {
		return (
			<Div mt3 mt4_l mh6_l>
				<Div>
					<Header ma3>
						<H1 ma0 f1 fw6>
							Browse race results
						</H1>
					</Header>
					<Div>
						<ResultsFilter
							races={this.props.allRaces}
							setFilteredRace={this.setFilteredRace.bind(this)}
							handleSearchUpdate={this.props.handleSearchUpdate}
						/>
					</Div>

					{this.props.allRiders.length > 0 && (
						<Fragment>
							<H2>Riders</H2>
							<RiderSummary riders={this.props.allRiders} />
						</Fragment>
					)}

					{this.props.allRaces.length > 0 && (
						<Fragment>
							<H2>Races</H2>
							<Grid mh3 pb4 bb bw1 b__light_gray>
								{this.props.allRaces.map((race, index) => (
									<ResultsSummary
										race={race}
										key={index}
										filtered={this.state.filteredEvent}
									/>
								))}
							</Grid>
						</Fragment>
					)}

					<ResultsContribute />
				</Div>
			</Div>
		);
	}
}

ResultsIndex.propTypes = {
	allRaces: PropTypes.array
};

ResultsIndex.defaultProps = {
	allRaces: []
};

export default ResultsIndex;
