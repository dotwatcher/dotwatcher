import { initAuth0 } from "@auth0/nextjs-auth0";

import { AUTH0_CALLBACK_DOMAIN } from "../utils/contstants";

export default initAuth0({
	audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
	clientId: process.env.AUTH0_APP_CLIENT_ID,
	clientSecret: process.env.AUTH0_APP_CLIENT_SECRET,
	scope: "openid profile email",
	domain: process.env.AUTH0_DOMAIN,
	redirectUri: `${AUTH0_CALLBACK_DOMAIN}/api/auth/callback`,
	postLogoutRedirectUri: AUTH0_CALLBACK_DOMAIN,
	session: {
		cookieSecret: process.env.AUTH0_APP_COOKIE_SECRET,
		cookieLifetime: 60 * 60 * 8,
		storeIdToken: true,
		storeRefreshToken: true,
		storeAccessToken: true
	}
});
