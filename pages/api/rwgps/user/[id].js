import Axios from "axios";

export default async (req, res) => {
	switch (req.method.toLowerCase()) {
		case "get":
			try {
				const { id, rideLimit = 20, rideOffset = 0 } = req.query;

				const token = req.headers["x-rwgps-token"];

				if (!id) {
					res.send({ error: "No user id provided" });
					return;
				}

				if (!token) {
					res.send({ error: "No token provided" });
					return;
				}

				const { data: profile } = await Axios({
					method: "get",
					url: `https://ridewithgps.com/users/${id}.json?auth_token=${token}&apikey=${process.env.RWGPS_API_KEY}&version=2`
				});

				const { data: rides } = await Axios({
					method: "get",
					url: `https://ridewithgps.com/users/${id}/trips.json?auth_token=${token}&apikey=${process.env.RWGPS_API_KEY}&version=2&offset=${rideOffset}&limit=${rideLimit}`
				});

				res.send({ user: profile.user, rides });
			} catch (error) {
				res.status(500).send({ error });
			}

			return;
		default:
			res.status(404).send(`Method ${req.method} not found`);
			break;
	}
};
