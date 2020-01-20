import React from "react";
import fetch from "isomorphic-fetch";
import formatter from "./formatter";
import apiUrl from "./../utils/api-url";
import Axios from "axios";
import { user as userAPI } from "../utils/auth";

export const WithProfile = Page => {
	const WithProfile = props => <Page {...props} />;

	WithProfile.getInitialProps = async ctx => {
		const { name } = ctx.query;

		const profileResponse = await fetch(
			apiUrl(`/api/rider?name=${encodeURIComponent(name)}`, ctx.req)
		);
		const { results } = await profileResponse.json();
		const profile = formatter(results);

		const auth0Profile =
			profile[0] && profile[0].auth_id
				? await userAPI.get(profile[0].auth_id)
				: {};

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			name,
			profile,
			auth0Profile: auth0Profile.success && auth0Profile.data
		};
	};

	return WithProfile;
};
