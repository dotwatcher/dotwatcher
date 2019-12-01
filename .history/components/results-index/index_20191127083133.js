import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import ResultsSummary from "../results-summary";
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

const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const Grid = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
	${tachyons}
`;

const RiderGrid = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
	grid-template-columns: repeat(4, 1fr);
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
							<RiderGrid>
								{this.props.allRiders.map((rider, index) => (
									<RiderGridItem
										w-20
										pa2
										flex
										hover_bg_lightest_blue
										bg_light_gray
										ba
										bw1
										b__white
										f4
										lh_copy
										key={index}
										id={rider.id}
									>
										<Link
											href={`/profile?name=${rider.name}`}
											as={`/profile/${rider.name}`}
											passHref
										>
											<A link near_black>
												<P f3 fw6 ma0 lh_title link hover_blue>
													{rider.name}
												</P>
											</A>
										</Link>
									</Div>
								))}
							</RiderGrid>
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
