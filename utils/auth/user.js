import axios from "axios";
import { getToken } from "./";

export default {
	get: async (id) => {
		try {
			const { token } = await getToken();

			const { data } = await axios({
				method: "get",
				url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`,
				headers: {
					authorization: `Bearer ${token}`,
				},
			});

			return {
				success: true,
				data,
			};
		} catch (error) {
			return {
				success: false,
				error,
			};
		}
	},
	update: async ({ id, data }) => {
		try {
			const { token } = await getToken();
			const res = await axios({
				method: "patch",
				url: `https:/${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`,
				headers: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				data: {
					user_metadata: data,
				},
			});

			return {
				success: true,
				data: res.data,
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				error,
			};
		}
	},
};
