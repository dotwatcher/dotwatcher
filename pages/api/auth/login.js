import auth0 from "../../../lib/auth0";
import Sentry from "@sentry/browser";

export default async function login(req, res) {
	try {
		await auth0.handleLogin(req, res);
	} catch (error) {
		await Sentry.captureMessage("Error in api/auth/login", "critical");
		res.writeHead(302, {
			Location:
				"/login/error?errorLocation=auth/login&errorLogs=" +
				JSON.stringify(error)
		});
		res.end();
	}
}
