import { initAuth0 } from "@auth0/nextjs-auth0";
import config from "./config";

export default initAuth0({
	audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
	clientId: process.env.AUTH0_APP_CLIENT_ID,
	clientSecret: process.env.AUTH0_APP_CLIENT_SECRET,
	scope: "openid profile",
	domain: process.env.AUTH0_DOMAIN,
	redirectUri: `${process.env.AUTH0_CALLBACK_DOMAIN}/api/auth/callback`,
	postLogoutRedirectUri: process.env.AUTH0_CALLBACK_DOMAIN,
	session: {
		cookieSecret: process.env.AUTH0_APP_COOKIE_SECRET,
		cookieLifetime: 60 * 60 * 8,
		storeIdToken: true,
		storeRefreshToken: true,
		storeAccessToken: true
	}
});
