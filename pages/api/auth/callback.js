import auth0 from "../../../lib/auth0";
import Sentry from "@sentry/browser";

export default async function callback(req, res) {
	const { profile } = req.cookies;

	const redirectTo = profile || "/profile/edit";

	try {
		await auth0.handleCallback(req, res, { redirectTo });
	} catch (error) {
		await Sentry.captureMessage("Error in api/auth/callback", "critical");
		res.writeHead(302, { Location: "/api/auth/login" });
		// res.writeHead(302, {
		// 	Location:
		// 		"/login/error?errorLocation=auth/callback&errorLogs=" +
		// 		JSON.stringify(error)
		// });
		res.end();
	}
}
