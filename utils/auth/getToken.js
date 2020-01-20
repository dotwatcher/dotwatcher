import axios from "axios";

export default async () => {
	try {
		const res = await axios({
			method: "get",
			url: "/api/auth/token"
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
