import React from "react";
import { createClient } from 'contentful';
import vars from './api-vars';

const client = createClient({
  space: vars.space,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const WithInfoPage = (Page) => {
	const withInfoPgae = (props) => <Page {...props} />;

	withInfoPgae.getInitialProps = async (ctx) => {
    const { slug } = ctx.query;
    
    client.getEntries({
      content_type: '<content_type_id>'
    })

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
		};
	};

	return WithInfoPage;
};

export default WithInfoPage