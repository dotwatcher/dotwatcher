import React from "react";
import fetch from "isomorphic-fetch";
import formatter from "./formatter";
import apiUrl from "./../utils/api-url";

export const WithProfile = Page => {
	const WithProfile = props => <Page {...props} />;

	WithProfile.getInitialProps = async ctx => {
		const { name } = ctx.query;

		const profileResponse = await fetch(
			apiUrl(`/api/rider?name=${encodeURIComponent(name)}`, ctx.req)
		);
		const { results } = await profileResponse.json();
		const profile = formatter(results);

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			name,
			profile
		};
	};

	return WithProfile;
};
