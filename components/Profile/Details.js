import tachyons from "styled-components-tachyons";
import styled from "styled-components";
import { Fragment } from "react";
import mq from "../../utils/media-query";
import { format } from "date-fns";

import {
	FaStrava as Strava,
	FaInstagram as Instagram,
	FaTwitter as Twitter,
	FaFacebook as Facebook
} from "react-icons/fa";

const Div = styled.div`
	${tachyons}
`;

const H1 = styled.h1`
	${tachyons}
`;

const Button = styled.button`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Grid = styled(Div)`
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

const Img = styled.img`
	${tachyons}
`;

const SocialAnchor = ({ href, children }) => (
	<A href={href} target="_blank" near_black hover_blue>
		{children}
	</A>
);

export default ({
	authID,
	auth0Profile,
	name,
	noSocialAccounts,
	loggedIn,
	isLoading,
	profileIsClaimed,
	isCurrentUserProfile,
	handleUnclaimedProfile,
	races
}) => {
	const getRaceByID = id => races.find(r => r.sys.id === id);

	return (
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

						{auth0Profile.user_metadata?.races && (
							<Fragment>
								<H1 f4 f3_l fw6 lh_title mt2>
									Upcoming Races
								</H1>

								<div>
									{auth0Profile.user_metadata?.races &&
										auth0Profile.user_metadata?.races.map(race => {
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

									{auth0Profile.user_metadata?.otherRaces &&
										auth0Profile.user_metadata?.otherRaces
											.split(",")
											.map(race => <p>{race}</p>)}
								</div>
							</Fragment>
						)}
					</div>
				</Grid>
			)}

			{/* Only show button on users current profile, or if unclaimed and user hasnt already claimed */}
			{(!loggedIn.user_metadata?.name ||
				loggedIn.user_metadata?.name.toLowerCase() === name.toLowerCase()) && (
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
					disabled={isLoading || (profileIsClaimed && !isCurrentUserProfile)}
					onClick={
						isCurrentUserProfile
							? () => Router.push("/profile/edit")
							: profileIsClaimed
							? null
							: handleUnclaimedProfile
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
	);
};
