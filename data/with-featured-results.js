// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from "react";
import fetch from "isomorphic-fetch";
import apiUrl from "./../utils/api-url";

export const WithResults = Page => {
	const WithResults = props => <Page {...props} />;

	WithResults.getInitialProps = async ctx => {
		const allResultsResponse = await fetch(
			// apiUrl(`/api/featured-races`, ctx.req)
			"https://aef3a54d-f4ca-4386-bece-c4199f4a3927.mock.pstmn.io/api/featured-races"
		);
		const races = await allResultsResponse.json();
		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			races
		};
	};

	return WithResults;
};
