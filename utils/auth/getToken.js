import axios from "axios";

export default async () => {
	try {
		const res = await axios({
			method: "get",
			url: process.env.AUTH0_CALLBACK_DOMAIN + "/api/auth/token"
		});

		return {
			success: true,
			token: res.data
		};
	} catch (error) {
		return {
			success: false,
			error
		};
	}
};
