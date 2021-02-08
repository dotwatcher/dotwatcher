import React, { Fragment, useState, useEffect } from "react";
import { compose } from "recompose";
import { withFormik } from "formik";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Head from "next/head";
import * as Yup from "yup";
import * as Sentry from "@sentry/browser";
import Router from "next/router";

import User from "../../utils/auth/user";
import { withRaces } from "../../data/with-races";
import auth0 from "../../lib/auth0";
import { fetchUser } from "../../utils/user";
import Page from "../../components/shared/page";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
	ProfileHeader,
	FormInputs,
	RideWithGPSConnection
} from "../../components/Profile/Edit";

import { user as userAPI } from "../../utils/auth";
import mq from "../../utils/media-query";

const Div = styled.div`
	${tachyons}
`;

const Form = styled.form`
	${tachyons}
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: var(--spacing-large);

	${mq.smUp`
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
	`};
`;

const inputs = [
	{
		name: "instagramHandle",
		label: "Instagram Profile",
		placeholder: "https://www.instagram.com/dotwatcher.cc"
	},
	{
		name: "stravaID",
		label: "Strava Profile",
		placeholder: "https://www.strava.com/athletes/12345"
	},
	{
		name: "rideWithGPSID",
		label: "Ride With GPS Profile",
		placeholder: "https://ridewithgps.com/users/12345"
	},
	{
		name: "twitterHandle",
		label: "Twitter Profile",
		placeholder: "https://twitter.com/dotwatcher"
	}
];

const Profile = ({
	user,
	meta = {},
	handleSubmit,
	setValues,
	values,
	...props
}) => {
	const [biographyValue, setBigoraphyValue] = useState(
		meta.user_metadata ? meta.user_metadata.biography : ""
	);

	const [showConnectAccount, setshowConnectAccount] = useState(false);

	const handleBiographyChange = async content => {
		await setBigoraphyValue(content);
		await setValues({ ...values, biography: content });
	};

	const disconnectRWGPS = async () => {
		await User.update({
			id: user.user.sub,
			data: { ...meta.user_metadata, rwgps: false }
		});

		Router.reload(window.location.pathname);
	};

	return (
		<Fragment>
			<Head>
				<script
					src="//widget.cloudinary.com/global/all.js"
					type="text/javascript"
				></script>

				<title>Edit my Profile</title>
			</Head>
			<Page>
				<Header user={user} title="dotwatcher.cc" />

				<Div mt3 ml3 mr4 mt4_l mh6_l>
					<h1>Profile</h1>

					<ProfileHeader
						meta={meta}
						user={user}
						setshowConnectAccount={setshowConnectAccount}
						disconnectRWGPS={disconnectRWGPS}
					/>

					<Div bw1 b__blue ba mb4 ph3>
						<p>
							We are updating how DotWatcher works with Ride With GPS, to stay
							up to date with the latest features and to make sure your account
							will have the most functionality, you can link DotWatcher.cc to
							Ride With GPS above.
						</p>

						<p>
							From the <strong>1st March 2021</strong> we will be removing the
							Ride With GPS field below.
						</p>
					</Div>

					<Form w_100 dib onSubmit={handleSubmit}>
						<FormInputs
							meta={meta}
							inputs={inputs}
							biographyValue={biographyValue}
							setBiographyValue={handleBiographyChange}
							{...props}
						/>
					</Form>
				</Div>

				{showConnectAccount && (
					<RideWithGPSConnection
						user={user}
						meta={meta}
						setshowConnectAccount={setshowConnectAccount}
					/>
				)}

				<Footer />
			</Page>
		</Fragment>
	);
};

const enhance = compose(
	withFormik({
		validationSchema: Yup.object().shape({
			instagramHandle: Yup.string().url(
				"Link is not a valid URL, include http(s)"
			),
			stravaID: Yup.string().url("Link is not a valid URL, include http(s)"),
			rideWithGPSID: Yup.string().url(
				"Link is not a valid URL, include http(s)"
			),
			twitterHandle: Yup.string().url(
				"Link is not a valid URL, include http(s)"
			),
			biography: Yup.string(),
			otherRaces: Yup.string()
		}),
		mapPropsToValues: ({ meta }) => {
			if (meta?.user_metadata) {
				return meta.user_metadata;
			}

			return Object.keys(inputs).reduce(
				(acc, curr) => {
					return { [acc[curr]]: "", ...acc };
				},
				{ races: [], otherRaces: "" }
			);
		},
		handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
			setSubmitting(true);

			try {
				const res = await userAPI.update({
					id: props.user.user.sub,
					data: values
				});

				if (!res.success) {
					setStatus(`There was an error updating the form`);
				}

				setStatus(`Successfully updated your details`);
			} catch (error) {
				setStatus(`There was an error updating the form`);
				console.log(error);
			} finally {
				setSubmitting(false);
			}
		}
	}),
	withRaces
);

Profile.getInitialProps = async ({ req, res }) => {
	if (typeof window === "undefined") {
		const session = await auth0.getSession(req);

		if (!session || !session.user) {
			if (process.env.NODE_ENV === "production") {
				console.log("Unable to get session ", session);

				await Sentry.captureException("Cannot get session " + session);
			}

			res.writeHead(302, {
				Location: "/api/auth/login"
			});
			res.end();
			return;
		}

		const meta = await userAPI.get(session.user.sub);

		return { user: session.user, meta: meta.data };
	}

	const user = await fetchUser();
	const meta = await userAPI.get(user.sub);
	return { user, meta: meta.data };
};

export default enhance(Profile);
