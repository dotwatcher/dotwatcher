// HOC for fetching entries from contentful

import React from "react";
import fetch from "isomorphic-fetch";
import apiUrl from "../utils/api-url";

export const WithRiders = Page => {
	const withRiders = props => <Page {...props} />;

	withRiders.getInitialProps = async ctx => {
		// toLower is performed on the SQL query. Able to lower case race name column and search value together
		try {
			const res = await fetch(apiUrl(`/api/riders`, ctx.req));
			const riders = await res.json();

			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
				riders
			};
		} catch (err) {
			console.log(err);
			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
			};
		}
	};

	return withRiders;
};
