var AuthenticationClient = require("auth0").AuthenticationClient;

var auth0 = new AuthenticationClient({
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export default async function login(req, res) {
	try {
		const { access_token } = await auth0.clientCredentialsGrant({
			audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
			scope: "read:users update:users",
		});

		res.status(200);
		res.send(access_token);
	} catch (e) {
		console.log(e);
		res.send(e);
	}
}
