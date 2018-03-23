import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Logo from './logo';

const Header = styled.header`${tachyons}`;
const P = styled.p`${tachyons}`;
const A = styled.a`${tachyons}`;

const Banner = ({title}) => (
	<Header bg_near_black near_white ph4 cf dt w_100>
		<Link href="/" as="/">
			<A dim near_white>
				<Logo>{title}</Logo>
			</A>
		</Link>
		<P dtc tr ma0 lh_copy>an Apidura production</P>
	</Header>
);

Banner.propTypes = {
	title: PropTypes.string.isRequired
};

export default Banner;
