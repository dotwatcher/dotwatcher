import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Router from "next/router";
import axios from "axios";
import { format } from "date-fns";
import mq from "../../utils/media-query";
import sanitizeName from "../../utils/sanitize-name";

import {
	FaStrava as Strava,
	FaInstagram as Instagram,
	FaTwitter as Twitter,
	FaFacebook as Facebook
} from "react-icons/fa";
import Link from "next/link";

import PageWrapper from "../../components/Profile/pageWrapper";
import { user as userAPI } from "../../utils/auth";
import apiUrl from "./../../utils/api-url";
import ResultsTable from "../../components/results-table";
import ResultsContribute from "../../components/results-contribute";
import { WithProfile } from "../../data/with-profile";
import { withRaces } from "../../data/with-races";
import { user as authUser } from "../../utils/auth";

const Heading = styled.header`
	${tachyons}
`;
const Button = styled.button`
	${tachyons}

	&:disabled {
		background-color: var(--gray);
		border-color: var(--gray);
		cursor: not-allowed;
	}
`;
const Input = styled.input`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Img = styled.img`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const Grid = styled.div`
	${tachyons};
	display: grid;
	grid-column-gap: 30px;
	grid-template-columns: repeat(1, 1fr);

	${mq.mdUp`
		grid-template-columns: repeat(3, 1fr);
	`}
`;

const SocialIcons = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;

	li + li {
		margin-left: var(--spacing-medium);
	}

	${A} {
		&:hover {
			cursor: pointer;
		}
	}
`;

const ClaimModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	align-items: center;

	&:before {
		content: "";
		display: inline-block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(62, 62, 62, 0.7);
	}
`;

const ClaimWrapper = styled.div`
	grid-column: 2 / span 10;
	padding: var(--spacing-large);
	z-index: 1;
	background: var(--white);
	position: relative;

	${mq.mdUp`
		grid-column: 3 / span 8;
		padding: var(--spacing-extra-large);
	`}
`;

const SocialAnchor = ({ href, children }) => (
	<A href={href} target="_blank" near_black hover_blue>
		{children}
	</A>
);

const App = ({ profile, name, user, auth0Profile, races }) => {
	const [claimToggle, setclaimToggle] = useState(false);
	const [claimConfim, setclaimConfim] = useState("");

	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const disabled =
		sanitizeName(claimConfim).toLowerCase() !==
		sanitizeName(name).toLowerCase();

	useEffect(() => {
		(async () => {
			try {
				const me = await axios({ method: "get", url: "/api/auth/me" });

				if (!me.error && me.status === 200 && me.data) {
					const profile = await authUser.get(me.data.sub);

					setLoggedIn({
						...me.data,
						user_metadata: profile.data.user_metadata
					});
				}
			} catch (error) {
				setLoggedIn(false);
				console.log(error);
			}
		})();
	}, []);

	const getRaceByID = id => races.find(r => r.sys.id === id);

	const handleClaim = async () => {
		setIsLoading(true);
		try {
			if (!loggedIn) {
				Router.push("/api/auth/login");
				return;
			}

			const profile = await axios({
				url: apiUrl(
					`/api/rider/update?auth_id=${loggedIn.sub}&rider_name=${name}`
				),
				method: "PATCH"
			});

			if (profile.errors) {
				console.log("There was an issue updating your profile", profile.errors);
			}

			// Set the profile name on the auth0 meta data
			await userAPI.update({ id: loggedIn.sub, data: { name } });

			Router.push("/profile/edit");
		} catch (err) {
			console.log(err);
			Router.push("/api/auth/login");
		} finally {
			setIsLoading(false);
		}
	};

	if (!profile || !profile[0])
		return (
			<PageWrapper name={name} user={user}>
				<Div mt3 mh6_l ph3>
					<Heading fl w_100 mb3 ph3>
						<H1 f3 f1_l fw6 lh_title>
							{name}
						</H1>
					</Heading>
					<Div fl w_100 ph3 mb6>
						<p>No results found for {name}.</p>
					</Div>
				</Div>
			</PageWrapper>
		);

	const authID = profile[0] && profile[0].auth_id;
	const profileIsClaimed = !!authID;
	const isCurrentUserProfile = !!loggedIn && loggedIn.sub === authID;
	const noSocialAccounts = !auth0Profile?.user_metadata.length <= 0;

	return (
		<PageWrapper name={name} user={user}>
			<Div mt3 mh6_l ph3>
				<Div pb5 className="cf">
					<Link href={`/results`} passHref>
						<A near_black hover_blue>
							← All results
						</A>
					</Link>

					<Heading fl w_100 mb3>
						<H1 f3 f1_l fw6 lh_title>
							{name}
						</H1>
					</Heading>

					<Div mb pb4 bb b__light_gray>
						{!!authID && (
							<Grid fl w_100>
								{
									<Img
										mw_100
										src={
											auth0Profile.user_metadata?.userPicture
												? auth0Profile.user_metadata.userPicture
												: auth0Profile.picture || "/static/empty-profile.png"
										}
										alt={name}
									/>
								}

								{auth0Profile.user_metadata?.biography && (
									<P mt2 mt0_l>
										{auth0Profile.user_metadata.biography}
									</P>
								)}

								<div>
									<H1 f4 f3_l fw6 lh_title mt0>
										Social Accounts
									</H1>
									{noSocialAccounts ? (
										<>No social accounts have been linked up</>
									) : (
										<SocialIcons>
											{auth0Profile.user_metadata?.twitterHanlde && (
												<li>
													<SocialAnchor
														title="Twitter"
														href={auth0Profile.user_metadata.twitterHanlde}
													>
														<Twitter />
													</SocialAnchor>
												</li>
											)}
											{auth0Profile.user_metadata?.stravaID && (
												<li>
													<SocialAnchor
														title="Strava"
														href={auth0Profile.user_metadata.stravaID}
													>
														<Strava />
													</SocialAnchor>
												</li>
											)}
											{auth0Profile.user_metadata?.rideWithGPSID && (
												<li>
													<SocialAnchor
														title="Ride With GPS"
														href={auth0Profile.user_metadata.rideWithGPSID}
													>
														<svg
															width="16px"
															height="16px"
															version="1.1"
															viewBox="0 0 512 512"
															xmlns="http://www.w3.org/2000/svg"
														>
															<g fill="none" fillRule="evenodd" strokeWidth="1">
																<g fill="currentColor" fillRule="nonzero">
																	<g transform="translate(29 96)">
																		<path d="m265.54 197.78c-0.59008 0.59044-0.59008 0.59044-1.1802 1.1809-12.982 15.942-40.715 46.645-44.846 51.369-46.026 55.502-72.58 66.13-102.08 68.492-5.3107 0.59045-10.621 0.59045-17.112 0.59045-50.747 0-100.31-42.512-100.31-96.833 0-50.188 35.405-91.519 83.201-96.833 3.5405-0.59045 11.211-1.1809 20.063 0 8.2611 1.1809 23.603 7.6758 23.603 15.942-0.59008 0-1.1802 0-1.7702-0.59044-12.392-2.9522-18.883-2.3618-25.373-1.7713-16.522 1.7713-27.734 7.0853-36.585 13.58-17.702 14.761-30.684 36.017-30.684 61.997 0 41.331 33.044 74.396 72.58 74.396 20.653 0 39.535-8.2662 53.107-22.437 2.3603-2.3618 4.7206-4.1331 6.4909-5.9045 18.883-20.075 58.418-63.768 58.418-73.215 0-10.628-23.603-34.836-47.796-49.007-34.815-20.666-35.995-36.608-35.995-49.007 0-38.969 60.188-59.635 118.02-53.731 14.162 51.959 54.877 54.911 61.958 55.502 21.243 1.7713 31.864 0 44.256-2.9522 12.982-2.9522 12.982-6.4949 12.982-6.4949s4.1305 4.7236-5.9008 11.218c-10.031 6.4949-37.175 16.532-55.467 16.532-38.945 0-60.188-16.532-80.251-38.379-44.256 3.5427-48.386 16.532-46.026 20.666 6.4909 9.4471 74.94 56.683 81.431 55.502 7.671-1.1809 38.355-27.16 85.561-23.027 53.107 1.1809 96.183 44.283 96.183 97.424 0 54.321-42.486 98.014-98.543 98.014-48.386 0-79.07-37.789-70.219-51.369 0.59008 0.59045 1.1802 1.1809 1.7702 1.1809 13.572 12.399 36.585 25.98 59.598 25.98 43.666 0 79.07-32.475 79.07-72.625 0-40.15-29.504-67.311-72.58-71.444-18.883-1.7713-29.504 1.7713-41.305 7.6758-11.211 5.314-25.963 18.894-37.175 30.113v-0.59045c-0.59008 0.59045-1.1802 1.1809-1.7702 1.7713-2.3603 2.9522-4.1305 5.314-5.3107 7.0853z" />
																		<path d="m315.24 67c14.275-0.59598 30.334-13.111 29.739-32.183-0.59479-19.071-19.628-30.395-36.877-33.375-34.498-5.3638-69.59 4.7678-79.107 21.455 0 0 3.5687-1.192 8.9218-2.9799 13.085-3.5759 26.766-1.7879 37.472 4.7678 4.7583 2.9799 5.9479 8.9396 5.9479 10.132-0.59479 22.647 19.628 32.183 33.903 32.183z" />
																	</g>
																</g>
															</g>
														</svg>
													</SocialAnchor>
												</li>
											)}
											{auth0Profile.user_metadata?.instagramHandle && (
												<li>
													<SocialAnchor
														title="Instagram"
														href={auth0Profile.user_metadata.instagramHandle}
													>
														<Instagram />
													</SocialAnchor>
												</li>
											)}
										</SocialIcons>
									)}

									<H1 f4 f3_l fw6 lh_title mt2>
										Upcoming Races
									</H1>
									<div>
										{auth0Profile.user_metadata?.races.map(race => {
											const { website, title, raceDate } = getRaceByID(
												race
											).data;
											return (
												<A near_black hover_blue href={website} target="_blank">
													<p key={race}>
														{title}, {format(raceDate, "MMM YYYY")}
													</p>
												</A>
											);
										})}

										{auth0Profile.user_metadata?.otherRaces.length > 0 &&
											auth0Profile.user_metadata?.otherRaces
												.split(",")
												.map(race => <p>{race}</p>)}
									</div>
								</div>
							</Grid>
						)}

						{/* Only show button on users current profile, or if unclaimed and user hasnt already claimed */}
						{(!loggedIn.user_metadata?.name ||
							loggedIn.user_metadata?.name.toLowerCase() ===
								name.toLowerCase()) && (
							<Button
								mt4
								f4
								bg_blue
								pv2
								mb3
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								type="button"
								disabled={
									isLoading || (profileIsClaimed && !isCurrentUserProfile)
								}
								onClick={
									isCurrentUserProfile
										? () => Router.push("/profile/edit")
										: profileIsClaimed
										? null
										: () => setclaimToggle(true)
								}
							>
								{isLoading
									? "Loading"
									: isCurrentUserProfile
									? "Edit your profile"
									: profileIsClaimed
									? "Profile already claimed"
									: "Claim this profile"}
							</Button>
						)}
					</Div>

					<H1 fl f3 f2_l fw6 lh_title>
						Latest Results
					</H1>
					<ResultsTable type="profile" results={profile} />
					<ResultsContribute />
				</Div>
			</Div>

			{claimToggle && (
				<ClaimModal>
					<ClaimWrapper>
						<p>
							By claiming this profile you agree that the information is correct
							and you are the person you say you are. Dotwatcher has the right
							to revoke your profile if we deem the information incorrect or
							there is impersonation.
						</p>

						<p>To continue re-type the rider name below:</p>

						<Input
							value={claimConfim}
							placeholder="Rider Name"
							type="text"
							onChange={e => setclaimConfim(e.target.value)}
							input_reset
							ba
							bw1
							b__blue
							ph3
							pv2
							mb3
							f4
							fl
							w_100
						/>

						<Button
							f4
							bg_blue
							w_100
							pv2
							mb3
							tc
							white
							ttl
							small_caps
							ba
							bw1
							b__blue
							dib
							type="button"
							onClick={handleClaim}
							disabled={disabled}
						>
							Claim
						</Button>

						<P
							near_black
							hover_blue
							underline
							onClick={() => setclaimToggle(false)}
						>
							Cancel
						</P>
					</ClaimWrapper>
				</ClaimModal>
			)}
		</PageWrapper>
	);
};

App.propTypes = {
	name: PropTypes.string,
	profile: PropTypes.array
};

App.defaultProps = {
	name: "",
	profile: []
};

const enhance = compose(WithProfile, withRaces);
export default enhance(App);
