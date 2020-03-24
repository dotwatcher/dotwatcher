import React, { Fragment, useState } from "react";
import { compose } from "recompose";
import { withFormik } from "formik";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";

import auth0 from "../../lib/auth0";
import { fetchUser } from "../../lib/user";
import Page from "../../components/shared/page";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { user as userAPI } from "../../utils/auth";
import mq from "../../utils/media-query";

const Div = styled.div`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Input = styled.input`
	${tachyons}
`;

const Textarea = styled.textarea`
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

const Button = styled.button`
	${tachyons}

	&:disabled {
		background-color: var(--gray);
		cursor: not-allowed;
		border: none;
	}
`;

const Span = styled.span`
	${tachyons}
`;

const BiographyInput = styled(Textarea)`
	min-height: 155px;
`;

const PictureThumb = styled.img`
	${tachyons}
	max-width: 200px;
`;

const inputs = [
	{
		name: "instagramHandle",
		placeholder: "Instagram Handle"
	},
	{
		name: "stravaID",
		placeholder: "Strava ID"
	},
	{
		name: "rideWithGPSID",
		placeholder: "Ride With GPS ID"
	}
];

const getProfilePicture = ({ meta }) => {
	if (meta.user_metadata?.userPicture) {
		return meta.user_metadata.userPicture;
	}

	if (meta.picture) {
		return meta.picture;
	}

	return "/static/empty-profile.png";
};

const Profile = ({
	user,
	values,
	handleSubmit,
	isSubmitting,
	isValid,
	handleChange,
	handleBlur,
	errors,
	status,
	meta
}) => {
	const profilePicture = getProfilePicture({ meta });

	const [preview, setPreview] = useState(profilePicture);

	const uploadWidget = () => {
		cloudinary.openUploadWidget(
			{
				cloud_name: process.env.CLOUDINARY_NAME,
				upload_preset: process.env.CLOUDINARY_PRESET,
				api_key: process.env.CLOUDINARY_KEY,
				api_secret: process.env.CLOUDINARY_SECRET,
				secure: true
			},
			async (error, result) => {
				if (result) {
					const userPicture = result[0].secure_url;
					setPreview(userPicture);

					await userAPI.update({ id: user.user.sub, data: { userPicture } });

					return;
				}

				console.log(error);
			}
		);
	};

	return (
		<Fragment>
			<Head>
				<script
					src="//widget.cloudinary.com/global/all.js"
					type="text/javascript"
				></script>
			</Head>
			<Page>
				<Header user={user} title="dotwatcher.cc" />

				<Div mt3 mt4_l mh6_l>
					<h1>Profile</h1>

					<Div mb4 bb bw1 pb4_ns b__light_gray>
						{preview && <PictureThumb src={preview} alt="Thumnail" />}
						<Div mt3 className="upload">
							<Button
								f4
								bg_blue
								hover_bg_dark_blue
								w_
								pv2
								mb3
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
								onClick={uploadWidget}
								type="button"
								className="upload-button"
							>
								Update Profile Image
							</Button>

							{meta.user_metadata?.name && (
								<Link
									href={`/profile?name=${meta.user_metadata.name}`}
									as={`/profile/${meta.user_metadata.name}`}
									passHref
								>
									<A>
										<Button
											f4
											bg_blue
											hover_bg_dark_blue
											w_
											pv2
											mb3
											tc
											white
											ttl
											small_caps
											ba
											bw1
											b__blue
											dib
											pointer
											ml4
										>
											View my profile
										</Button>
									</A>
								</Link>
							)}
						</Div>
					</Div>

					<Form w_100 dib onSubmit={handleSubmit}>
						<div>
							{inputs.map((input, i) => {
								return (
									<label key={i}>
										<Span dib w_100 f4 mb1>
											{input.placeholder}
										</Span>
										<Input
											type="text"
											name={input?.name}
											placeholder={input?.placeholder}
											value={values && values[input?.name]}
											onChange={handleChange}
											onBlur={handleBlur}
											input_reset
											ba
											bw1
											b__blue
											ph3
											pv2
											mb3
											f4
											fl
											w_100
										/>
										{errors[input?.name] && (
											<Span dib mb4 blue>
												{errors[input?.name]}
											</Span>
										)}
									</label>
								);
							})}
						</div>

						<div>
							<label>
								<Span dib w_100 f4 mb1>
									Biography
								</Span>
								<BiographyInput
									name="biography"
									value={values?.biography}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Bio"
									input_reset
									ba
									bw1
									b__blue
									ph3
									pv2
									mb3
									f4
									fl
									w_100
								/>
							</label>

							<Button
								f4
								bg_blue
								w_100
								pv2
								mb3
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
								hover_bg_dark_blue
								type="submit"
								disabled={isSubmitting || !isValid}
							>
								{isSubmitting ? "Saving" : "Update"}
							</Button>

							{status && (
								<Div w_100 dib>
									<p>{status}</p>
								</Div>
							)}
						</div>
					</Form>
				</Div>
				<Footer />
			</Page>
		</Fragment>
	);
};

const enhance = compose(
	withFormik({
		mapPropsToValues: ({ meta }) => {
			debugger;
			if (meta.user_metadata) {
				return meta.user_metadata;
			}

			return Object.keys(inputs).reduce((acc, curr) => {
				return { [acc[curr]]: "", ...acc };
			}, {});
		},
		validationSchema: yup.object().shape({
			stravaID: yup.number("Strava ID should only contain numbers"),
			rideWithGPSID: yup.number("Ride With GPS ID should only contain numbers")
		}),
		handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
			setSubmitting(true);
			try {
				await userAPI.update({
					id: props.user.user.sub,
					data: values
				});
				setStatus(`Successfully updated your details`);
			} catch (error) {
				setStatus(
					`There was an error updating the form - ${JSON.stringfy(error)}`
				);
				console.log(error);
			} finally {
				setSubmitting(false);
			}
		}
	})
);

Profile.getInitialProps = async ({ req, res }) => {
	if (typeof window === "undefined") {
		const session = await auth0.getSession(req);
		if (!session || !session.user) {
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
