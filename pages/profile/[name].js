import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import { gql } from "@apollo/client";
import Link from "next/link";

import sanitizeName from "../../utils/sanitize-name";
import getNationalFlag from "../../utils/get-national-flag";
import ProfileStats from "../../components/Profile/Stats";
import ProfileAwards from "../../components/Profile/Awards";
import ProfileRWGPS from "../../components/Profile/RWGPS";
import Modal, { ModalWrapper } from "../../components/UI/Modal";
import awards from "../../lib/awards";
import { totalDistanceOfRaces } from "../../utils/distance";

import { Accordion, AccordionItem } from "../../components/UI/Accordion";

import { user as userAPI } from "../../utils/auth";
import apiUrl from "./../../utils/api-url";

import { user as authUser } from "../../utils/auth";
import Image from "next/image";

import Button from "@Components/UI/Button";
import Input from "@Components/UI/Input";
import H1 from "@Components/UI/H1";
import A from "@Components/UI/A";
import P from "@Components/UI/P";
import Center from "@Components/UI/Center";
import Section from "@Components/UI/Section";
import RideWithGPS from "@Components/UI/Icons/ride-with-gps";
import Strava from "@Components/UI/Icons/strava";
import Instagram from "@Components/UI/Icons/instagram";
import Twitter from "@Components/UI/Icons/twitter";
import { Table } from "@ComponentsNew/Profile";

import dim from "@Utils/dim";
import { HEAD } from "@Utils/contstants";
import client from "@Utils/apollo";

const Claim = styled(Button)`
	width: 100%;
`;

const UserAvatar = styled.div`
	img {
		border-radius: 100%;
	}
`;

const SocialIcon = styled.div`
	display: inline-block;
	width: 35px;
	margin: 0 ${dim()};
`;

const RiderProfile = ({ data, user, auth0Profile }) => {
	const { rider } = data;

	const { authId, name, nationality, results } = rider;

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
						user_metadata: profile.data && profile.data.user_metadata
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

	const profileIsClaimed = !!authId;
	const isCurrentUserProfile = !!loggedIn && loggedIn.sub === authId;

	const handleUnclaimedProfile = () => {
		if (!user.loggedIn) {
			Cookies.set("profile", window.location.pathname);
			router.push("/api/auth/login");
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

	const total = totalDistanceOfRaces(results);

	const achievedAwards = awards.filter(award => award.distance <= total);

	const meta = property => {
		if (!property) return false;

		if (!auth0Profile || !auth0Profile.user_metadata) return false;

		return auth0Profile.user_metadata[property];
	};

	return (
		<Fragment>
			<Head>
				<title key={HEAD.TITLE}>{name}'s Profile - DotWatcher.cc</title>
				<meta
					key={HEAD.OG_TITLE}
					property="og:title"
					content={`${name}'s Profile - DotWatcher.cc`}
				/>

				<link rel="canonical" href={`https://dotwatcher.cc/profile/${name}`} />
				<meta
					name="twitter:title"
					content={`${name}'s Profile - DotWatcher.cc`}
				/>
			</Head>

			<Section>
				<Center>
					<H1>
						{name} {getNationalFlag(nationality)}
					</H1>

					<UserAvatar>
						<Image
							width={200}
							height={200}
							title={name}
							aly={name}
							src={
								!!auth0Profile && auth0Profile.userPicture
									? auth0Profile.userPicture
									: !!auth0Profile && auth0Profile.picture
									? auth0Profile.picture
									: "/static/empty-profile.png"
							}
						/>
					</UserAvatar>

					{/* Only show button on users current profile, or if unclaimed and user hasnt already claimed */}
					{(!meta("name") ||
						meta("name").toLowerCase() === name.toLowerCase()) && (
						<Button
							type="button"
							disabled={
								isLoading || (profileIsClaimed && !isCurrentUserProfile)
							}
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
				</Center>
			</Section>

			<Section>
				{!noSocialAccounts && (
					<Center>
						{meta("twitterHanlde") && (
							<SocialIcon>
								<a title="Twitter" href={meta("twitterHanlde")}>
									<Twitter />
								</a>
							</SocialIcon>
						)}
						{meta("stravaID") && (
							<SocialIcon>
								<a title="Strava" href={meta("stravaID")}>
									<Strava />
								</a>
							</SocialIcon>
						)}
						{meta("rideWithGPSID") && (
							<SocialIcon>
								<a title="Ride With GPS" href={meta("rideWithGPSID")}>
									<RideWithGPS />
								</a>
							</SocialIcon>
						)}

						{meta("instagramHandle") && (
							<SocialIcon>
								<a title="Instagram" href={meta("instagramHandle")}>
									<Instagram />
								</a>
							</SocialIcon>
						)}
					</Center>
				)}
			</Section>

			{meta("biography") && (
				<Section>
					<Center>
						<div dangerouslySetInnerHTML={{ __html: meta("biography") }} />
					</Center>
				</Section>
			)}

			<Section>
				<Link href={`/results`} passHref>
					<A near_black hover_blue>
						← All riders
					</A>
				</Link>
			</Section>

			<Section>
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
							results={results}
							name={name}
							auth0Profile={auth0Profile}
							handleUnclaimedProfile={handleUnclaimedProfile}
						/>
					</AccordionItem>

					{auth0Profile && auth0Profile.user_metadata?.rwgps && (
						<ProfileRWGPS auth0Profile={auth0Profile} name={name} />
					)}

					<AccordionItem id="stats" title="Latest Results" isOpen>
						<Table data={results} name={name} />
					</AccordionItem>
				</Accordion>
			</Section>

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
						/>

						<Claim type="button" onClick={handleClaim} disabled={disabled}>
							Claim
						</Claim>

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
		</Fragment>
	);
};

export const getServerSideProps = async ctx => {
	try {
		const { data } = await client.query({
			variables: {
				name: ctx.query.name
			},
			query: gql`
				query rider($name: String!) {
					rider(name: $name) {
						id
						name
						nationality
						authId
						annualDistances {
							terrain
							years {
								year
								totalDistance
								results {
									racename
									position
								}
							}
						}
						results {
							racename
							slug
							year
							position
							cap
							class
							category
							result
							bike
							finishlocation
							finishdistance
							days
							hours
							minutes
							notes
							length
						}
					}
				}
			`
		});

		const auth0Profile = data.rider.authId
			? await userAPI.get(data.rider.authId)
			: {};

		return {
			props: {
				data,
				auth0Profile: auth0Profile.success && auth0Profile.data
			}
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
};

export default RiderProfile;
