import Axios from "axios";
import qs from "query-string";

const createQuery = (props = {}) => {
	const queries = {
		...props,
		apikey: process.env.RWGPS_API_KEY,
		version: 2
	};

	return qs.stringify(queries);
};

export const getUserFromCredentials = async ({ username, password }) => {
	try {
		const { data } = await Axios({
			method: "get",
			url:
				"https://ridewithgps.com/users/current.json?" +
				createQuery({ email: username, password })
		});

		return data;
	} catch (e) {
		console.log(e);
	}
};
