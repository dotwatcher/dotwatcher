import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import ResultsSummary from '../results-summary';
import ResultsContribute from '../results-contribute';
import ResultsFilter from './results-filter';

const Div = styled.div`${tachyons}`;
const Header = styled.header`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Grid = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
${tachyons}`;


class ResultsIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredEvent: ''
		};
		this.setFilteredEvent = this.setFilteredEvent.bind(this);
	}

	setFilteredEvent(id) {
		this.setState({
			filteredEvent: id
		});
	}

	render() {
		return (
			<Div mt3 mt4_l mh6_l>
				<Div>
					<Header ma3>
						<H1 ma0 f1 fw6>Browse race results</H1>
					</Header>
					<Div>
						<ResultsFilter events={this.props.raceResultsByYear} setFilteredEvent={this.setFilteredEvent.bind(this)} />
					</Div>
					<Grid mh3 pb4 bb bw1 b__light_gray>
						{
							this.props.raceResultsByYear.map((result, index) => <ResultsSummary event={result} key={index} filtered={this.state.filteredEvent} />)
						}
					</Grid>
					<ResultsContribute />
				</Div>
			</Div>
		);
	};
}

ResultsIndex.propTypes = {
	raceResultsByYear: PropTypes.array
};

ResultsIndex.defaultProps = {
	raceResultsByYear: []
};

export default ResultsIndex;
