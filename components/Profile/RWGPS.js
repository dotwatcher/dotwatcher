import { useEffect, useState } from "react";
import Axios from "axios";
import { AccordionItem } from "../../components/UI/Accordion";
import { format } from "date-fns";
import { formatDuration } from "date-fns";

const RWGPSProfile = ({ auth0Profile, ...props }) => {
	const [profile, setprofile] = useState(false);

	const fetchProfile = async auth0Profile => {
		if (!auth0Profile) return;
		try {
			const { data } = await Axios({
				method: "get",
				url: `/api/rwgps/user/${auth0Profile.user_metadata.rwgps.userID}`,
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
					View {user.name} profile
				</a>
			)}

			{rides && (
				<>
					<h3>Latest rides</h3>

					<ul>
						{rides.results.map((ride, id) => (
							<li>
								<p>
									<a
										href={`https://ridewithgps.com/trips/${ride.id}`}
										target="_blank"
									>
										View full route
									</a>
								</p>

								<p>
									{format(new Date(ride.departed_at), "h:mm a, MMM Do YYYY ")}
								</p>

								<p>{(ride.distance / 1000).toFixed(2)} km</p>
								<p>{ride.elevation_gain.toFixed()} meters</p>

								<p>{ride.moving_time}</p>
								<p>
									{formatDuration(
										{ seconds: ride.moving_time },
										{ format: ["hours", "seconds"] }
									)}
								</p>
							</li>
						))}
					</ul>
				</>
			)}
		</AccordionItem>
	);
};

export default RWGPSProfile;
