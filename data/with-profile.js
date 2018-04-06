import React from 'react';
import {createClient} from 'contentful';
import lodash from 'lodash';

export const withProfile = Page => {
	const withProfile = props => <Page {...props}/>;

	withProfile.getInitialProps = async ({query: {id}}) => {
		let profile
		
		const client = createClient({
			space: '6hyijb95boju',
			accessToken: 'f214dba82579af555cd4839172570328cf8aee10e37bf5b83094953bb65fb317'
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
