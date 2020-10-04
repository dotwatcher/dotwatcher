import React, { useState, useEffect, useRef } from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import sanitizeName from "../../utils/sanitize-name";
import getNationalFlag from "../../utils/get-national-flag";
import ProfileDetails from "../../components/Profile/Details";
import ProfileStats from "../../components/Profile/Stats";
import ProfileAwards from "../../components/Profile/Awards";
import ProfileRWGPS from "../../components/Profile/RWGPS";
import Modal, { ModalWrapper } from "../../components/UI/Modal";
import awards from "../../lib/awards";
import { totalDistanceOfRaces } from "../../utils/distance";

import { Accordion, AccordionItem } from "../../components/UI/Accordion";

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

const Div = styled.div`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const App = ({ profile, name, user, auth0Profile, races }) => {
	const router = useRouter();
	const [claimToggle, setclaimToggle] = useState(false);
	const [claimConfim, setclaimConfim] = useState("");

	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const statsRef = useRef(null);

	const disabled =
		sanitizeName(claimConfim).toLowerCase() !==
		sanitizeName(name).toLowerCase();

	const showStats = router.asPath.includes("#statistics");

	useEffect(() => {
		(async () => {
			Cookies.remove("profile");
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

	useEffect(() => {
		if (statsRef.current && showStats) {
			setTimeout(() => {
				window.scrollTo({
					left: 0,
					top: statsRef.current.offsetTop,
					behavior: "smooth"
				});
			}, 500);
		}
	}, [statsRef]);

	const handleClaim = async () => {
		setIsLoading(true);

		try {
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

	if (!profile || !profile[0]) {
		return (
			<PageWrapper name={name} user={user}>
				<Div mt3 mh6_l ph3>
					<Heading fl w_100 mb3>
						<H1 f3 f1_l fw6 lh_title>
							{name} {getNationalFlag(nationality)}
						</H1>
					</Heading>
					<Div fl w_100 ph3 mb6>
						<p>No results found for {name}.</p>
					</Div>
				</Div>
			</PageWrapper>
		);
	}

	const authID = profile[0] && profile[0].auth_id;
	const profileIsClaimed = !!authID;
	const isCurrentUserProfile = !!loggedIn && loggedIn.sub === authID;

	const handleUnclaimedProfile = () => {
		if (!user.loggedIn) {
			Cookies.set("profile", window.location.pathname);
			Router.push("/api/auth/login");
			return;
		}

		setclaimToggle(true);
	};

	const noSocialAccounts =
		!!auth0Profile &&
		!auth0Profile.user_metadata?.twitterHanlde &&
		!auth0Profile.user_metadata?.stravaID &&
		!auth0Profile.user_metadata?.rideWithGPSID &&
		!auth0Profile.user_metadata?.instagramHandle;

	const total = totalDistanceOfRaces(profile);

	const achievedAwards = awards.filter(award => award.distance <= total);

	const nationality = profile[0] && profile[0].nationality;

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
							{name} {getNationalFlag(nationality)}
						</H1>
					</Heading>

					<ProfileDetails
						authID={authID}
						auth0Profile={auth0Profile}
						name={name}
						noSocialAccounts={noSocialAccounts}
						loggedIn={loggedIn}
						isLoading={isLoading}
						profileIsClaimed={profileIsClaimed}
						isCurrentUserProfile={isCurrentUserProfile}
						handleUnclaimedProfile={handleUnclaimedProfile}
						races={races}
					/>

					<Accordion>
						{/*achievedAwards.length > 0 && (
							<AccordionItem id="awards" title="Distance Achievements">
								<ProfileAwards profile={profile} awards={achievedAwards} />
							</AccordionItem>
						)*/}

						<AccordionItem
							id="stats"
							title="Stats"
							isOpen={showStats}
							ref={statsRef}
						>
							<ProfileStats
								profile={profile}
								name={name}
								auth0Profile={auth0Profile}
								handleUnclaimedProfile={handleUnclaimedProfile}
							/>
						</AccordionItem>

						{!!auth0Profile.user_metadata?.rwgps && (
							<ProfileRWGPS auth0Profile={auth0Profile} />
						)}

						<AccordionItem id="stats" title="Latest Results" isOpen>
							<ResultsTable
								type="profile"
								results={profile}
								showNationality={false}
							/>
						</AccordionItem>
					</Accordion>
					<ResultsContribute />
				</Div>
			</Div>

			{claimToggle && (
				<Modal>
					<ModalWrapper>
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
					</ModalWrapper>
				</Modal>
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
