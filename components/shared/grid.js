import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Div = styled.div`
	${tachyons}
	display: grid;
	grid-gap: var(--spacing-large);
	grid-template-columns: repeat(auto-fill, 500px);
	justify-content: center;
	align-content: end;
	* {
		justify-self: start;
	}

`;

const Grid = ({children}) => (
	<Div pa4>
		{children}
	</Div>
);

Grid.propTypes = {
	children: PropTypes.node
};

Grid.defaultProps = {
	children: ''
};

export default Grid;
