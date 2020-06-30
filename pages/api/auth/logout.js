import auth0 from "../../../lib/auth0";

export default async function logout(req, res) {
	// try {
	await auth0.handleLogout(req, res);
	// } catch (error) {
	// 	res.writeHead(302, {
	// 		Location:
	// 			"/login/error?errorLocation=auth/logout&errorLogs=" +
	// 			JSON.stringify(error)
	// 	});
	// 	res.end();
	// }
}
