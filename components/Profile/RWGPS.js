import { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "date-fns";
import styled from "styled-components";

import { AccordionItem } from "../../components/UI/Accordion";
import { secondsToHours, averageSpeed } from "../../utils/journey-metrics";

const RidesList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const Ride = styled.li`
	padding-bottom: var(--spacing-small);

	border-top: var(--gray) 1px solid;
`;

const P = styled.p``;

const Flex = styled.section`
	display: flex;
	justify-content: space-around;
	background: var(--light-gray);
`;

const RWGPSProfile = ({ auth0Profile, name }) => {
	const [profile, setprofile] = useState(false);

	const fetchProfile = async auth0Profile => {
		if (!auth0Profile) return;
		try {
			const { data } = await Axios({
				method: "get",
				url: `/api/rwgps/user/${auth0Profile.user_metadata.rwgps.userID}?rideLimit=10`,
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

			{user && (
				<a target="_blank" href={`https://ridewithgps.com/users/${user.id}`}>
					Go to {name}'s full profile
				</a>
			)}

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
											<spam>
												{ride.locality}, {ride.country_code}
											</spam>
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

								<P>
									<a
										href={`https://ridewithgps.com/trips/${ride.id}`}
										target="_blank"
									>
										View full route
									</a>
								</P>

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
