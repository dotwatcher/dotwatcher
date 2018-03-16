import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Div = styled.div`
	${tachyons}
`;

const Wrapper = ({children}) => (
	<Div ph4 className="cf">
		{children}
	</Div>
);

Wrapper.propTypes = {
	children: PropTypes.node
};

Wrapper.defaultProps = {
	children: ''
};

export default Wrapper;
