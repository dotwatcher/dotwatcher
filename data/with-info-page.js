import React from "react";
import { createClient } from "contentful";
import vars from "./api-vars";

const client = createClient({
	space: vars.space,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const WithInfoPage = Page => {
	const WithInfoPage = props => <Page {...props} />;

	WithInfoPage.getInitialProps = async ctx => {
		try {
			let page = await client.getEntries({
				content_type: vars.content_type.infoPage,
				"fields.slug": ctx.query.slug,
				include: 2
			});

			[page] = page.items;

			console.log(page);

			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				page
			};
		} catch (error) {
			console.log(error);
			return {
				...(Page.getInitialProps ? await Page.getInitialProps() : {}),
				error
			};
		}
	};

	return WithInfoPage;
};

export default WithInfoPage;
