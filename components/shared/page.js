import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Div = styled.div`${tachyons}`;

const Wrapper = ({children}) => (
	<Div sans_serif near_black pa0 ma0 className="cf">
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
