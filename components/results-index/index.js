import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import ResultsSummary from '../results-summary';
import ResultsContribute from '../results-contribute';

const Div = styled.div`${tachyons}`;
const Header = styled.header`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const Grid = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr) );
${tachyons}`;

const ResultsIndex = ({ raceResultsByYear }) => {
	return (
		<Div mt3 mh6_l>
			<Div pb5 className="cf">
				<Header ma3>
					<H1 ma0 f1 fw6>Browse race results</H1>
				</Header>
				<Grid mh3 pb4 bb bw1 b__light_gray>
					{
						raceResultsByYear.map((result, i) => <ResultsSummary event={result} key={i} />)
					}
				</Grid>
				<ResultsContribute />
			</Div>
		</Div>
	);
};

ResultsIndex.propTypes = {
	raceResultsByYear: PropTypes.array
};

ResultsIndex.defaultProps = {
	raceResultsByYear: []
};

export default ResultsIndex;
