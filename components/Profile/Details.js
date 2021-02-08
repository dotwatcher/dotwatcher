import { useEffect } from "react";
import styled from "styled-components";
import { Fragment } from "react";
import mq from "../../utils/media-query";
import { format } from "date-fns";
import Router from "next/router";
import { P, Div, H1, Button, A, Img } from "../UI/Tachyons";
import { isAfter } from "date-fns";

import {
	FaStrava as Strava,
	FaInstagram as Instagram,
	FaTwitter as Twitter,
	FaFacebook as Facebook
} from "react-icons/fa";
import Axios from "axios";

const SubmitButton = styled(Button)`
	&:focus,
	&:hover {
		border-color: var(--dark-blue);
		background-color: var(--dark-blue);
		outline: 0;
	}
	&:active {
		border-color: var(--gold);
		background-color: var(--gold);
	}
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

const SocialAnchor = ({ href, children }) => (
	<A href={href} target="_blank" near_black hover_blue>
		{children}
	</A>
);

const ProfileDetails = ({
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

	const meta = property => {
		if (!property) return false;

		if (!auth0Profile || !auth0Profile.user_metadata) return false;

		return auth0Profile.user_metadata[property];
	};

	// Get all future rider races
	const upcomingRaces = meta("races")
		? meta("races").filter(race => {
				const idRace = getRaceByID(race);
				return idRace && isAfter(idRace.raceDate, Date.now());
		  })
		: [];

	return (
		<Div mb pb4 bb b__light_gray>
			{!!authID && (
				<Grid fl w_100>
					{meta("biography") && (
						<div dangerouslySetInnerHTML={{ __html: meta("biography") }} />
					)}

					<div>
						{upcomingRaces.length > 0 && (
							<Fragment>
								<H1 f4 f3_l fw6 lh_title mt2>
									Upcoming Races
								</H1>

								<div>
									{upcomingRaces.map((race, ind) => {
										const { website, title, raceDate } = race.data;
										return (
											<A near_black hover_blue href={website} target="_blank">
												<p key={ind}>
													{title}, {format(raceDate, "MMM YYYY")}
												</p>
											</A>
										);
									})}

									{meta("otherRaces") &&
										meta("otherRaces")
											.split(",")
											.map(race => <p>{race}</p>)}
								</div>
							</Fragment>
						)}
					</div>
				</Grid>
			)}

			{/* Only show button on users current profile, or if unclaimed and user hasnt already claimed */}
			{(!meta("name") || meta("name").toLowerCase() === name.toLowerCase()) && (
				<SubmitButton
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
					pointer
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
				</SubmitButton>
			)}
		</Div>
	);
};

export default ProfileDetails;
