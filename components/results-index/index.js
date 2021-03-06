import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import { Ring as Loader } from "react-awesome-spinners";

import ResultsSummary from "../results-summary";
import RiderSummary from "../Results/rider-summary";
import ResultsContribute from "@ComponentsNew/ResultsContribute";
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

const LoaderWrapper = styled.div`
	margin: var(--spacing-extra-large) auto;
	display: block;
	text-align: center;
`;

const ResultsWrapper = styled.div`
	margin-left: var(--spacing-medium);
	margin-right: var(--spacing-medium);
`;

class ResultsIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredEvent: ""
		};
		this.setFilteredRace = this.setFilteredRace.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}

	setFilteredRace(id) {
		this.setState({
			filteredEvent: id
		});
	}

	renderResults() {
		return (
			<ResultsWrapper>
				{this.props.allRiders.length > 0 && (
					<Fragment>
						<H2>Riders</H2>
						<RiderSummary riders={this.props.allRiders} />
					</Fragment>
				)}

				{this.props.allRaces.length > 0 && (
					<Fragment>
						<H2>Races</H2>
						<Grid pb4 bb bw1 b__light_gray>
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
			</ResultsWrapper>
		);
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

					{this.props.loading ? (
						<LoaderWrapper>
							<Loader color="#000" />
						</LoaderWrapper>
					) : (
						this.renderResults()
					)}

					<ResultsContribute />
				</Div>
			</Div>
		);
	}
}

ResultsIndex.propTypes = {
	allRaces: PropTypes.array,
	allRiders: PropTypes.array,
	loading: PropTypes.bool
};

ResultsIndex.defaultProps = {
	allRaces: [],
	allRiders: [],
	loading: false
};

export default ResultsIndex;
