import { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "date-fns";
import styled from "styled-components";

import { Image , Div } from '../../components/UI/Tachyons'
import { AccordionItem } from "../../components/UI/Accordion";
import { secondsToHours, averageSpeed } from "../../utils/journey-metrics";

import { A, P } from "../../components/UI/Tachyons";

const RidesList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const Ride = styled.li`
	padding-bottom: var(--spacing-medium);
	border-top: var(--gray) 1px solid;
`;

const Flex = styled.section`
	display: flex;
	justify-content: space-around;
	background: var(--light-gray);
`;

const UserName = styled(Div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const RWGPSProfile = ({ auth0Profile, name }) => {
	const [profile, setprofile] = useState(false);

	const fetchProfile = async auth0Profile => {
		if (!auth0Profile) return;
		try {
			const { data } = await Axios({
				method: "get",
				url: `/api/rwgps/user/${auth0Profile.user_metadata.rwgps.userID}?rideLimit=5`,
				headers: {
					"x-rwgps-token": auth0Profile.user_metadata.rwgps.authToken
				}
			});
			setprofile(data);
			return data;
		} catch (error) {
			setprofile({ error });
			console.log(error);
			return error;
		}
	};

	useEffect(() => {
		setprofile({ loading: true });
		fetchProfile(auth0Profile);

		() => fetchProfile();
	}, []);

	const { user, rides } = profile;

	return (
		<AccordionItem id="RWGPS" title="Ride With GPS">
			{profile.loading && <p>Fetching profile...</p>}

			<UserName>
				{user && (
					<A
					target="_blank"
					href={`https://ridewithgps.com/users/${user.id}`}
					black
					hover_blue
					>
					Go to {name}'s full profile
					</A>
					)}
					
				<Image src="https://images.ctfassets.net/6hyijb95boju/5n5lVR7jKaaJeH9YEt16Gv/f7cf005d6b6e5b957549816bcc898618/RWGPS_horizontal-logo_226.png?w=100" alt={`Go to ${name}'s full profile`} title={`Go to ${name}'s full profile`} />
			</UserName>
			
			{rides && (
				<>
					<h3>Recent rides</h3>

					<RidesList>
						{rides.results.map(ride => (
							<Ride key={ride.id}>
								<div>
									<div>
										<P>
											<span>
												{format(
													new Date(ride.departed_at),
													"MMM Do YYYY h:mma"
												)}
											</span>{" "}
											<span>
												{ride.locality}, {ride.country_code}
											</span>
											{". "}
											<span>
												<A
													href={`https://ridewithgps.com/trips/${ride.id}`}
													target="_blank"
													black
													hover_blue
												>
													View full route
												</A>
											</span>
										</P>
									</div>

									<Flex>
										<P>{(ride.distance / 1000).toFixed(2)} km</P>
										<P>{ride.elevation_gain.toFixed()} meters elevation</P>

										<P>{secondsToHours(ride.moving_time)}</P>

										<P>
											{averageSpeed({
												distance: ride.distance,
												time: ride.moving_time,
												returnFormat: "kph"
											}).toFixed(1)}{" "}
											km/h
										</P>
									</Flex>
								</div>

								{/*	<div>
									<iframe
										src={`https://ridewithgps.com/embeds?type=trip&id=${ride.id}&metricUnits=true`}
										style="width: 1px; min-width: 100%; height: 550px; border: none;"
										scrolling="no"
									></iframe>
							< /div> */}
							</Ride>
						))}
					</RidesList>
				</>
			)}
		</AccordionItem>
	);
};

export default RWGPSProfile;
