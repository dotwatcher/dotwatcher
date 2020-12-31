import { Fragment, useState } from "react";
import mq from "@Utils/media-query";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import H4 from "@Components/UI/H4";
import A from "@Components/UI/A";
import colors from "@Utils/colors";
import dim from "@Utils/dim";

const ImageWrap = styled.div`
	text-align: center;
	width: 100%;
`;

// Hide H1, only there for SEO purpose
const H1 = styled.h1`
	display: none;
`;

const Nav = styled.nav`
	display: grid;
	grid-template-columns: repeat(6, 1fr);

	${mq.mdUp`
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
	margin-top: ${dim(2)};
	padding-top: ${dim(2)};
	border-top: 1px solid ${colors.lightgrey};
	border-bottom: 1px solid ${colors.lightgrey};

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
	right: 0;
	top: 0;
	width: 60px;
`;

const HeaderComp = ({ user }) => {
	const [optionsVisible, setoptionsVisible] = useState(false);

	return (
		<Header>
			<H1>DotWatcher.cc</H1>
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

			<Nav>
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
				</NavWrap>
			</Nav>
		</Header>
	);
};

export default HeaderComp;
