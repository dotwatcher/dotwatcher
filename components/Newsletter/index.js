import MailchimpSubscribe from "react-mailchimp-subscribe";
import { logEvent } from "../../utils/analytics";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

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

const mailchimpURL = process.env.MAILCHIMP || "";

const CustomForm = ({
	status,
	message,
	onValidated,
	showPastIssues,
	onSubmit = true
}) => {
	const [cookies, setCookie] = useCookies(["hideSignup"]);

	let email;

	const submit = () => {
		const handleProps = () =>
			typeof onSubmit === "function" ? onSubmit() : onSubmit;

		return (
			email &&
			handleProps() &&
			onValidated({
				EMAIL: email.value
			})
		);
	};

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
			{showPastIssues && (
				<P fl ma0 w_100 lh_copy f6>
					<Link href="/digest" passHref>
						<A link dark_gray underline>
							See all past issues
						</A>
					</Link>
				</P>
			)}
		</Form>
	);
};

export default ({ showPastIssues = true, onSubmit = true }) => (
	<MailchimpSubscribe
		url={mailchimpURL}
		render={({ subscribe, status, message }) => (
			<CustomForm
				status={status}
				message={message}
				onValidated={formData => subscribe(formData)}
				url={mailchimpURL}
				showPastIssues={showPastIssues}
				onSubmit={onSubmit}
			/>
		)}
	/>
);
