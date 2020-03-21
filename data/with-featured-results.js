// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from "react";
import fetch from "isomorphic-fetch";
import apiUrl from "./../utils/api-url";

export const WithResults = Page => {
	const withResults = props => <Page {...props} />;

	withResults.getInitialProps = async ctx => {
		const getInitialProps = Page.getInitialProps
			? await Page.getInitialProps(ctx)
			: {};

		try {
			const allResultsResponse = await fetch(
				apiUrl(`/api/featured-races`, ctx.req)
			);

			const races = await allResultsResponse.json();

			return {
				...getInitialProps,
				races
			};
		} catch (e) {
			console.log(e);

			return {
				...getInitialProps
			};
		}
	};

	return withResults;
};
