import auth0 from "../../../lib/auth0";

export default async function login(req, res) {
	try {
		await auth0.handleLogin(req, res);
	} catch (error) {
		res.writeHead(302, {
			Location:
				"/login/error?errorLocation=auth/login&errorLogs=" +
				JSON.stringify(error)
		});
		res.end();
	}
}
