import { getUserFromCredentials } from "../../../utils/rwgps";

export default async (req, res) => {
	switch (req.method.toLowerCase()) {
		case "post":
			try {
				const data = await getUserFromCredentials({
					username: req.body.username,
					password: req.body.password
				});

				res.send(data);
			} catch (error) {
				res.status(500).send(error);
			}

			return;
		default:
			res.status(404).send(`Method ${req.method} not found`);
			break;
	}
};
