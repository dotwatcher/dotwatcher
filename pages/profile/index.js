import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Router from "next/router";
import axios from "axios";

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
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 30px;
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
	grid-column: 3 / span 8;
	z-index: 1;
	padding: var(--spacing-extra-large);
	background: var(--white);
	position: relative;
`;

const SocialAnchor = ({ href, children }) => (
	<A href={href} target="_blank" near_black hover_blue>
		{children}
	</A>
);

const App = ({ profile, name, user, auth0Profile }) => {
	const [claimToggle, setclaimToggle] = useState(false);
	const [claimConfim, setclaimConfim] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios({ method: "get", url: "/api/auth/me" });
				if (!res.error && res.status === 200 && res.data) {
					setLoggedIn(res.data);
				}
			} catch (e) {
				setLoggedIn(false);
				console.log(e);
			}
		})();
	}, []);

	const handleClaim = async () => {
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
											auth0Profile.user_metadata
												? auth0Profile.user_metadata.userPicture
												: "/static/empty-profile.png"
										}
										alt={name}
									/>
								}

								{auth0Profile.user_metadata && (
									<P mt0>{auth0Profile.user_metadata.biography}</P>
								)}

								<div>
									<H1 f4 f3_l fw6 lh_title mt0>
										Social Accounts
									</H1>
									<SocialIcons>
										{auth0Profile.user_metadata && (
											<li>
												<SocialAnchor
													title="Strava"
													href={`https://www.strava.com/athletes/${auth0Profile.user_metadata.stravaID}`}
												>
													<Strava />
												</SocialAnchor>
											</li>
										)}
										{auth0Profile.user_metadata && (
											<li>
												<SocialAnchor
													title="Ride With GPS"
													href={`https://www.strava.com/athletes/${auth0Profile.user_metadata.rideWithGPSID}`}
												>
													<svg
														width="16px"
														height="16px"
														viewBox="0 0 512 512"
														version="1.1"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g
															stroke="none"
															stroke-width="1"
															fill="none"
															fill-rule="evenodd"
														>
															<g fill="currentColor" fill-rule="nonzero">
																<g
																	id="cyclist-logo-small"
																	transform="translate(29.000000, 96.000000)"
																>
																	<path
																		d="M265.535248,197.777784 C264.94517,198.368229 264.94517,198.368229 264.355091,198.958675 C251.373368,214.900703 223.639687,245.603868 219.509138,250.327432 C173.483029,305.829308 146.929504,316.457327 117.425587,318.819109 C112.114883,319.409555 106.804178,319.409555 100.313316,319.409555 C49.5665796,319.409555 0,276.897479 0,222.576494 C0,172.388628 35.4046997,131.057443 83.2010444,125.743434 C86.7415144,125.152988 94.4125326,124.562543 103.263708,125.743434 C111.524804,126.924325 126.866841,133.419225 126.866841,141.685462 C126.276762,141.685462 125.686684,141.685462 125.096606,141.095017 C112.704961,138.142789 106.214099,138.733235 99.7232376,139.32368 C83.2010444,141.095017 71.9895561,146.409026 63.1383812,152.903926 C45.4360313,167.665064 32.4543081,188.921101 32.4543081,214.900703 C32.4543081,256.231887 65.4986945,289.296835 105.033943,289.296835 C125.686684,289.296835 144.569191,281.030598 158.140992,266.859906 C160.501305,264.498124 162.861619,262.726788 164.631854,260.955451 C183.51436,240.880304 223.049608,197.187338 223.049608,187.74021 C223.049608,177.112192 199.446475,152.903926 175.253264,138.733235 C140.438642,118.067643 139.258486,102.125614 139.258486,89.7262591 C139.258486,50.7568568 199.446475,30.0912646 257.274151,35.9957195 C271.436031,87.9549226 312.151436,90.9071501 319.232376,91.4975955 C340.475196,93.268932 351.096606,91.4975955 363.488251,88.5453681 C376.469974,85.5931407 376.469974,82.0504677 376.469974,82.0504677 C376.469974,82.0504677 380.600522,86.7740316 370.569191,93.268932 C360.537859,99.7638324 333.394256,109.801406 315.101828,109.801406 C276.156658,109.801406 254.913838,93.268932 234.851175,71.4224489 C190.5953,74.9651218 186.464752,87.9549226 188.825065,92.088041 C195.315927,101.535169 263.765013,148.770808 270.255875,147.589917 C277.926893,146.409026 308.610966,120.429425 355.817232,124.562543 C408.924282,125.743434 452,168.845955 452,221.986049 C452,276.307034 409.51436,320 353.456919,320 C305.070496,320 274.386423,282.211489 283.237598,268.631242 C283.827676,269.221688 284.417755,269.812133 285.007833,269.812133 C298.579634,282.211489 321.592689,295.791735 344.605744,295.791735 C388.27154,295.791735 423.67624,263.317233 423.67624,223.16694 C423.67624,183.016646 394.172324,155.856154 351.096606,151.723035 C332.214099,149.951699 321.592689,153.494372 309.791123,159.398827 C298.579634,164.712836 283.827676,178.293083 272.616188,189.511547 C272.616188,189.511547 272.616188,189.511547 272.616188,188.921101 C272.02611,189.511547 271.436031,190.101992 270.845953,190.692438 C268.48564,193.644665 266.715405,196.006447 265.535248,197.777784 Z"
																		id="Combined-Shape"
																	></path>
																	<path
																		d="M315.244484,67 C329.519433,66.4040248 345.578751,53.8885463 344.983962,34.8173409 C344.389172,15.7461356 325.355907,4.42260736 308.10701,1.44273152 C273.609216,-3.92104499 238.516633,6.21053286 229,22.8978376 C229,22.8978376 232.568737,21.7058872 237.921843,19.9179617 C251.007213,16.3421107 264.687373,18.1300362 275.393585,24.6857631 C280.151901,27.6656389 281.34148,33.6253906 281.34148,34.8173409 C280.746691,57.4643973 300.969535,67 315.244484,67 Z"
																		id="Oval-3"
																	></path>
																</g>
															</g>
														</g>
													</svg>
												</SocialAnchor>
											</li>
										)}
										{auth0Profile.user_metadata && (
											<li>
												<SocialAnchor
													title="Instagram"
													href={`https://www.instagram.com/${auth0Profile.user_metadata.instagramHandle}/`}
												>
													<Instagram />
												</SocialAnchor>
											</li>
										)}

										{/*<li>
										<SocialAnchor
											href={`https://twitter.com/marksmithstuff`}
											title="Twitter"
										>
											<Twitter />
										</SocialAnchor>
									</li>

									<li>
										<SocialAnchor
											href={`https://www.facebook.com/alex.greenaway.9`}
											title="Facebook"
										>
											<Facebook />
										</SocialAnchor>
									</li>*/}
									</SocialIcons>
								</div>
							</Grid>
						)}

						{/* if there is a user, but no auth0 sub id.*/}
						{
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
								disabled={profileIsClaimed && !isCurrentUserProfile}
								onClick={
									isCurrentUserProfile
										? () => Router.push("/profile/edit")
										: profileIsClaimed
										? null
										: () => setclaimToggle(true)
								}
							>
								{isCurrentUserProfile
									? "Edit your profile"
									: profileIsClaimed
									? "Profile already claimed"
									: "Claim this profile"}
							</Button>
						}
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
							there is inmpersination
						</p>

						<p>To continue re-type the rider name bellow:</p>

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
							disabled={claimConfim.toLowerCase() !== name.toLowerCase()}
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

export default WithProfile(App);
