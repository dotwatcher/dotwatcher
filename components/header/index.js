import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import Logo from "./logo";
import axios from "axios";

const A = styled.a`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const Div = styled.div`
	width: 170px;
	margin: 0 auto;
	@media screen and (min-width: 48em) {
		margin: 0 0 0 var(--spacing-large);
	}
`;
const Menu = styled.div`
	padding: 0 var(--spacing-medium) var(--spacing-medium);
	margin-left: auto;
	line-height: 1;
	font-size: 2.25rem;
	clear: left;

	@media screen and (min-width: 48em) {
		padding: var(--spacing-medium);
		display: flex;
		align-items: center;
		clear: none;
		float: right;
	}
	${tachyons}
`;

const Header = styled.header`
	position: sticky;
	top: 0;
	${tachyons}
`;

const Banner = ({ title, raceName, race, user }) => {
	const loggedIn = user && user.loggedIn;
	return (
		<React.Fragment>
			<Header
				flex_ns
				bg_white
				bb
				b__light_gray
				near_black
				w_100
				z_2
				className="cf"
				id="banner"
			>
				<H1 flex items_center f2 pt1 ma0 fw5 lh_solid w_40_l>
					<Div>
						<Logo>{title}</Logo>
					</Div>
				</H1>
				{raceName ? (
					<H2 fl dn pv3 ph4 flex_ns items_center f4 ma0 lh_solid fw5>
						<Link href={`/race/${race.fields.slug}`} passHref>
							<A no_underline pt3 near_black hover_blue>
								{race.fields.title}
							</A>
						</Link>
					</H2>
				) : null}
				<Menu tc>
					<Link href="/races" passHref>
						<A
							dib
							pt3
							mr2
							mr3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Reports
						</A>
					</Link>
					<Link href="/results" passHref>
						<A
							dib
							pt3
							mh2
							mh3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Results
						</A>
					</Link>
					<Link href="/calendar" passHref>
						<A
							dib
							pt3
							mh2
							mh3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Calendar
						</A>
					</Link>
					<Link href="/features" passHref>
						<A
							dib
							pt3
							mh2
							mh3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Features
						</A>
					</Link>
					<Link href="/about" passHref>
						<A
							dib
							pt3
							ml3_ns
							mr2
							mr3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							About
						</A>
					</Link>

					{loggedIn ? (
						<Link href="/profile/edit" passHref>
							<A
								dib
								pt3
								ml2
								ml3_ns
								mr2
								mr3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								Account
							</A>
						</Link>
					) : (
						<A
							href="/api/auth/login"
							dib
							pt3
							ml3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Login
						</A>
					)}

					{loggedIn && (
						<A
							href="/api/auth/logout"
							dib
							pt3
							ml3_ns
							mr2
							mr3_ns
							f5
							f4_l
							near_black
							hover_blue
							no_underline
							fw5
						>
							Logout
						</A>
					)}
				</Menu>
			</Header>
		</React.Fragment>
	);
};

Banner.propTypes = {
	title: PropTypes.string.isRequired,
	raceName: PropTypes.string,
	race: PropTypes.object
};

Banner.defaultProps = {
	raceName: "",
	race: {}
};

export default Banner;
