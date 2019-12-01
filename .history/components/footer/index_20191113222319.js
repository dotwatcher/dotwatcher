import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import SocialIcons from "../shared/social-icons";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { logEvent } from "../../utils/analytics";
import { useCookies } from "react-cookie";

const mailchimpURL = process.env.MAILCHIMP || "";

const Div = styled.div`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const P = styled.p`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;
const Form = styled.form`
	${tachyons}
`;
const EmailInput = styled.input`
	&:focus {
		outline: 0;
		background-color: var(--light-yellow);
	}
	${tachyons}
`;
const SubmitButton = styled.button`
	&:focus,
	&:hover {
		border-color: var(--dark-blue);
		background-color: var(--dark-blue);
		outline: 0;
	}
	&:active {
		border-color: var(--gold);
		background-color: var(--gold);
	}
	${tachyons}
`;
const Message = styled.div`
	a:link,
	a:visited {
		color: var(--blue);
	}
	a:hover {
		color: var(--light-blue);
	}
	${tachyons}
`;

const CustomForm = ({ status, message, onValidated }) => {
	const [cookies, setCookie] = useCookies(["hideSignup"]);
	let email;
	const submit = () =>
		email &&
		onValidated({
			EMAIL: email.value
		});

	if (message && message.startsWith("0 - ")) {
		message = message.split("0 - ")[1];
	}

	const markAsSignedUp = () => {
		setCookie("hideSignup", true, {
			path: "/",
			maxAge: 31557600 // 1 year in seconds
		});
	};

	return (
		<Form
			onSubmit={e => {
				e.preventDefault();
				submit();
				markAsSignedUp();
				logEvent("Subscribed", location.pathname, "footer");
			}}
		>
			<EmailInput
				ref={node => (email = node)}
				type="email"
				name="email"
				placeholder="your.name@email.com"
				input_reset
				ba
				bw1
				b__blue
				ph3
				pv2
				mb3
				f4
				br_0_l
				fl
				w_100
				w_70_ns
			/>
			<SubmitButton
				f4
				bg_blue
				fl
				w_100
				w_30_ns
				ph3
				pv2
				mb3
				center
				tc
				white
				tracked
				ttl
				small_caps
				ba
				bw1
				b__blue
				type="submit"
			>
				Subscribe
			</SubmitButton>
			{status === "sending" && (
				<Message fl w_70 ph3 f6 lh_copy>
					sending...
				</Message>
			)}
			{status === "error" && (
				<Message
					fl
					w_70
					red
					ph3
					f6
					lh_copy
					dangerouslySetInnerHTML={{ __html: message }}
				/>
			)}
			{status === "success" && (
				<Message
					fl
					w_70
					ph3
					f6
					lh_copy
					dangerouslySetInnerHTML={{ __html: message }}
				/>
			)}
			<P fl ma0 w_100 lh_copy f6>
				<A
					link
					dark_gray
					underline
					href="https://us18.campaign-archive.com/home/?u=f99c4be1902d7d056695899c7&id=5114f468a5"
					target="_blank"
				>
					See all past issues
				</A>
			</P>
		</Form>
	);
};

const Footer = () => {
	return (
		<Div fl w_100 bg_near_white mt4 className="cf">
			<Div pv3 mh6_l>
				<Div fl w_100 w_50_ns ph3 mb4>
					<H2 f3 mb2 fw6>
						About
					</H2>
					<P lh_copy measure dark_gray>
						DotWatcher is here to showcase the best of long distance
						self-supported bike racing. The DotWatcher Digest is a regular
						roundup of the best content from around the bikepacking webosphere,
						delivered via an exclusive newsletter.
					</P>
					<MailchimpSubscribe
						url={mailchimpURL}
						render={({ subscribe, status, message }) => (
							<CustomForm
								status={status}
								message={message}
								onValidated={formData => subscribe(formData)}
								url={mailchimpURL}
							/>
						)}
					/>
				</Div>
				<Div fr="true" w_100 w_25_ns ph3 mb4>
					<H2 f3 mb2 fw6>
						Contact
					</H2>
					<P lh_copy measure_narrow dark_gray>
						If you have a race you would like us to cover or just want to get in
						touch email us at{" "}
						<A
							link
							near_black
							underline
							hover_blue
							href="mailto:info@dotwatcher.cc"
						>
							info@dotwatcher.cc
						</A>
					</P>
					<SocialIcons size="2" colour="near-black" />
				</Div>
			</Div>
		</Div>
	);
};

export default Footer;
