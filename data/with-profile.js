import React from 'react';
import fetch from 'isomorphic-fetch';
import formatter from './formatter';

export const WithProfile = Page => {
	const WithProfile = props => <Page {...props}/>;

	WithProfile.getInitialProps = async ({query: { name }}) => {

		const profileResponse = await fetch(`http://localhost:3000/api/allRiders?name=${encodeURIComponent(name)}`);
		const { results } = await profileResponse.json();
		const profile = formatter(results)
		
		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			name,
			profile
		};
	};

	return WithProfile;
};
