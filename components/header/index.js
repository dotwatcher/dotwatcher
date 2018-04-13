import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Logo from './logo';

const Header = styled.header`${tachyons}`;
const P = styled.p`${tachyons}`;

const Banner = ({title}) => (
	<Header bg_near_black near_white ph4 pv3 cf dt w_100 fixed_l z_1>
		<Logo>{title}</Logo>
		<P dtc tr ma0 lh_copy>an Apidura production</P>
	</Header>
);

Banner.propTypes = {
	title: PropTypes.string.isRequired
};

export default Banner;
