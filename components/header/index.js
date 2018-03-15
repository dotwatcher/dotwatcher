import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Logo from './logo';

const Header = styled.header`
	${tachyons}
`;

const Banner = ({title}) => (
	<Header bg_near_black pa4>
		<Logo>{title}</Logo>
	</Header>
);

Banner.propTypes = {
	title: PropTypes.string.isRequired
};

export default Banner;
