import { Fragment, useState } from "react";
import mq from "@Utils/media-query";
import Image from "next/image";
import styled, { css } from "styled-components";
import Link from "next/link";
import H4 from "@Components/UI/H4";
import A from "@Components/UI/A";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import className from "classnames";

const ImageWrap = styled.div`
	text-align: center;
	width: 100%;
`;

// Hide H1, only there for SEO purpose
const H2 = styled.h2`
	display: none;
`;

const Nav = styled.nav`
	${mq.mdDown`
		transform: translateX( -100vw);
		transition: transform ease-in-out 0.3s;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: ${colors.white};
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		${props =>
			props.navOpen &&
			css`
				transform: translateX(0);
			`}
		`}

	${mq.mdUp`
		grid-template-columns: repeat(6, 1fr);
		display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
`;

const Profile = styled.div`
	position: absolute;
	right: ${dim()};
	top: 0;
`;

const NavWrap = styled.div`
	display: inline-flex;
	justify-content: space-around;
	grid-column: span 6;
	padding-top: ${dim(2)};
	border-top: 1px solid ${colors.lightgrey};
	border-bottom: 1px solid ${colors.lightgrey};
	flex-direction: column;
	text-align: center;

	${mq.mdUp`
		margin-top: ${dim(2)};
		flex-direction: row;
	`}

	a {
		text-decoration: none;
		text-transform: uppercase;
		font-weight: bold;
		border: none;

		&:hover {
			color: ${colors.primarylight};
			border-bottom: 1px solid ${colors.primarylight};
		}
	}

	${mq.mdUp`
		grid-column: 2 / span 10;
    padding-left: ${dim(6)};
    padding-right: ${dim(6)};
	`};
`;

const Header = styled.header`
	position: relative;
	display: grid;
`;

const Options = styled.ul`
	background: ${colors.white};
	width: ${dim(12)};
	margin: ${dim(4)} 0 0 0;
	padding: ${dim(0.5)} 0;
	list-style-type: none;
	box-shadow: -4px 10px 19px 0px rgba(151, 151, 151, 1);

	li {
		padding-left: ${dim()};
	}

	li + li {
		border-top: 1px solid ${colors.lightgrey};
	}
`;

const OptionsToggle = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
	position: absolute;
	width: 60px;
	right: -25px;
	top: 5px;

	${mq.mdUp`
		right: 0;
		top: 0;
	`}
`;

const NavToggle = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;

	${mq.lgUp`
		display: none;
	`}
`;

const HeaderComp = ({ user }) => {
	const [optionsVisible, setoptionsVisible] = useState(false);
	const [navOpen, setNavOpen] = useState(false);

	const cn = className({
		"is-active": navOpen,
		"hamburger--arrow": true,
		hamburger: true
	});

	return (
		<Header>
			<NavToggle>
				<button
					className={cn}
					type="button"
					onClick={() => setNavOpen(prev => !prev)}
				>
					<span className="hamburger-box">
						<span className="hamburger-inner"></span>
					</span>
				</button>
			</NavToggle>

			<H2>DotWatcher.cc</H2>
			<ImageWrap>
				<Link href="/" passHref>
					<a title="DotWatcher.cc">
						<Image
							src="/static/images/dw-logo.svg"
							title="DotWatcher.cc"
							alt="DotWatcher.cc"
							width={210}
							height={40}
							priority
						/>
					</a>
				</Link>
			</ImageWrap>

			<Profile>
				<OptionsToggle>
					<Image
						src="/static/icons/account.svg"
						alt="My Account"
						title="My Account"
						width={38}
						height={38}
						priority
						onClick={() => setoptionsVisible(!optionsVisible)}
					/>
				</OptionsToggle>

				{optionsVisible && (
					<Options>
						{user.loggedIn ? (
							<Fragment>
								<li>
									<Link href={`/profile/${user.user.name}`} passHref>
										<a>
											<p>View Profile</p>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/profile/edit" passHref>
										<a title="Edit My Profile">
											<p>Edit Profile</p>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/api/auth/logout" passHref>
										<a title="Logout">
											<p>Logout</p>
										</a>
									</Link>
								</li>
							</Fragment>
						) : (
							<Fragment>
								<li>
									<Link href="/api/auth/login" passHref>
										<a title="Login">
											<p>Login</p>
										</a>
									</Link>
								</li>

								<li>
									<Link href="/api/auth/login" passHref>
										<a title="Register">
											<p>Register</p>
										</a>
									</Link>
								</li>
							</Fragment>
						)}
					</Options>
				)}
			</Profile>

			<Nav navOpen={navOpen}>
				<NavWrap>
					<H4>
						<Link href="/races" passHref>
							<A title="Reports">Reports</A>
						</Link>
					</H4>
					<H4>
						<Link href="/results" passHref>
							<A title="Results">Results</A>
						</Link>
					</H4>
					<H4>
						<Link href="/calendar" passHref>
							<A title="Calendar">Calendar</A>
						</Link>
					</H4>
					<H4>
						<Link href="/features" passHref>
							<A title="Features">Features</A>
						</Link>
					</H4>
					<H4>
						<Link href="/about" passHref>
							<A title="About DotWatcher">About DotWatcher</A>
						</Link>
					</H4>
				</NavWrap>
			</Nav>
		</Header>
	);
};

export default HeaderComp;
