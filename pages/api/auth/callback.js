import auth0 from "../../../lib/auth0";

export default async function callback(req, res) {
	const { profile } = req.cookies;

	const redirectTo = profile || "/profile/edit";

	try {
		await auth0.handleCallback(req, res, { redirectTo });
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
