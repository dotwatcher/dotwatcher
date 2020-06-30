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
		// (Required) The secret used to encrypt the cookie.
		cookieSecret: process.env.AUTH0_APP_COOKIE_SECRET,
		// (Optional) The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
		cookieLifetime: 60 * 60 * 8,
		// (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
		cookieDomain: AUTH0_CALLBACK_DOMAIN,
		// (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
		cookieSameSite: "none",
		// (Optional) Store the id_token in the session. Defaults to false.
		storeIdToken: false,
		// (Optional) Store the access_token in the session. Defaults to false.
		storeAccessToken: false,
		// (Optional) Store the refresh_token in the session. Defaults to false.
		storeRefreshToken: false
	}
});
