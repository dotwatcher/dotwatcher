import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';
import vars from './api-vars';

export const withProfile = Page => {
	const withProfile = props => <Page {...props}/>;

	withProfile.getInitialProps = async ({query: {id}}) => {
		let profile

		const client = createClient({
			space: vars.space,
			accessToken: vars.accessToken
		});

		const response = await client.getEntries({'sys.id': id});

		if (response.items[0]) {
			profile = {
				sys: {
					id: response.sys.id
				},
				data: {
					name: response.items[0].fields.name,
					profilePhoto: response.items[0].fields.profilePhoto,
					biography: response.items[0].fields.biography,
					twitterUsername: response.items[0].fields.twitterUsername,
					instagramUsername: response.items[0].fields.instagramUsername,
					categories: response.items[0].fields.category
				}
			};

			if (response.items[0].fields.profilePhoto) {
				profile.data.profilePhoto = lodash.find(response.includes.Asset, obj => {
					return obj.sys.id === response.items[0].fields.profilePhoto.sys.id;
				});
			}
		}

		return {
			...(Page.getInitialProps ? await Page.getInitialProps() : {}),
			profile
		};
	};

	return withProfile;
};
