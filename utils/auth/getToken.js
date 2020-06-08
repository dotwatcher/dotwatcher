import axios from "axios";
import { AUTH0_CALLBACK_DOMAIN } from "../../utils/contstants";

export default async () => {
	try {
		const res = await axios({
			method: "get",
			url: AUTH0_CALLBACK_DOMAIN + "/api/auth/token"
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
