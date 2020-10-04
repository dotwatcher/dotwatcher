import { withFormik } from "formik";
import { compose } from "recompose";
import styled from "styled-components";
import * as Yup from "yup";
import Router from "next/router";

import Modal, { ModalWrapper } from "../../UI/Modal";
import { user as userAPI } from "../../../utils/auth";
import { Input, Span, Button, Div, Form } from "../../UI/Tachyons";
import Axios from "axios";

const FrormActions = styled.div`
	display: flex;

	justify-content: space-between;
`;

const Status = styled.div`
	border: 1px solid var(--blue);
	margin-bottom: var(--spacing-large);
	padding: 0 var(--spacing-extra-small);
`;

const RWGPSConnection = ({
	handleSubmit,
	errors,
	values,
	handleBlur,
	handleChange,
	status,
	setshowConnectAccount,
	isSubmitting,
	isValid,
	touched
}) => {
	const close = () => setshowConnectAccount(false);

	return (
		<Modal>
			<ModalWrapper>
				<h2>Connect your RideWithGPS Account</h2>

				<p>
					Enter your details for RideWithGPS to pair your account with
					dotwatcher.cc.
				</p>

				{status && (
					<Status>
						<p>{status}</p>
					</Status>
				)}
				<div>
					<Form w100 onSubmit={handleSubmit}>
						<Div dib w_100>
							<Input
								type="text"
								name="username"
								placeholder="Email Address"
								value={values.username}
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
							{errors.username && touched.username && (
								<Span dib mb4 blue>
									{errors.username}
								</Span>
							)}

							<Input
								type="password"
								name="password"
								placeholder="Password"
								value={values.password}
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
							{errors.password && touched.password && (
								<Span dib mb4 blue>
									{errors.password}
								</Span>
							)}
						</Div>

						<FrormActions>
							<Button
								f4
								bg_blue
								hover_bg_dark_blue
								w_
								pv2
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
								type="submit"
								disabled={!isValid}
							>
								Submit
							</Button>

							<Button
								f4
								bg_transparent
								hover_bg_blue
								w_
								pv2
								tc
								blue
								hover_white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
								type="button"
								onClick={close}
							>
								Cancel
							</Button>
						</FrormActions>
					</Form>
				</div>
			</ModalWrapper>
		</Modal>
	);
};

const formik = {
	validationSchema: Yup.object().shape({
		username: Yup.string().email(),
		password: Yup.string()
	}),
	handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
		setSubmitting(true);

		try {
			const { data } = await Axios({
				method: "post",
				url: "/api/rwgps/user",
				data: values
			});

			const user = await userAPI.update({
				id: props.user.user.sub,
				data: {
					...props.meta.user_metadata,
					rwgps: { authToken: data.user.auth_token, userID: data.user.id }
				}
			});

			if (user.success) {
				setStatus("Successfully connected your Ride With GPS account");

				setTimeout(() => {
					props.setshowConnectAccount(false);
				}, 2500);

				Router.reload(window.location.pathname);

				return;
			}

			setStatus("There was a problem connecting your Ride With GPS account");
		} catch (err) {
			setStatus(
				"There was a problem connecting your Ride With GPS account, please check your login details"
			);
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	}
};
const enhance = compose(withFormik(formik));

export default enhance(RWGPSConnection);
