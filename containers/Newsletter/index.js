import MailchimpSubscribe from "react-mailchimp-subscribe";
import { logEvent } from "../../utils/analytics";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import Link from "next/link";
import Input from "@Components/UI/Input";
import Button from "@Components/UI/Button";
import A from "@Components/UI/A";
import P from "@Components/UI/P";
import dim from "@Utils/dim";
import colors from "@Utils/colors";
import mq from "@Utils/media-query";

const Inputs = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	align-items: baseline;

	${mq.mdUp`
		grid-template-columns: repeat(12, 1fr);
	`}
`;

const StyledInput = styled.div`
	grid-column: span 6;

	${mq.mdUp`
		grid-column: 1 / span 6;
	`}
`;

const StyledSubmit = styled(Button)`
	margin-top: ${dim(2)};
	grid-column: span 6;

	${mq.mdUp`
		margin: 0;
		grid-column: 8 / span 5;
	`}
`;

const Status = styled.div`
	margin-top: ${dim()};

	${mq.mdUp`
		grid-column: 1 / span 9;
	`}
`;

const StyledError = styled(P)`
	color: ${colors.red};
`;

const PastIssues = styled(P)`
	padding-top: ${dim(0.5)};
`;

const CustomForm = ({
	status,
	message,
	onValidated,
	showPastIssues = true,
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

	const handleSubmit = () => {
		e.preventDefault();
		submit();
		markAsSignedUp();
		logEvent("Subscribed", location.pathname, "footer");
	};

	return (
		<form onSubmit={handleSubmit}>
			<Inputs>
				<StyledInput>
					<Input type="email" name="email" placeholder="Email Address" />
					{showPastIssues && (
						<PastIssues>
							<Link href="/digest" passHref>
								<A>Discover past issues</A>
							</Link>
						</PastIssues>
					)}
				</StyledInput>

				{status === "sending" ? (
					<StyledSubmit disabled>Sending</StyledSubmit>
				) : (
					<StyledSubmit type="submit">Subscribe</StyledSubmit>
				)}

				<Status>
					{status === "error" && (
						<StyledError dangerouslySetInnerHTML={{ __html: message }} />
					)}
					{status === "success" && (
						<P dangerouslySetInnerHTML={{ __html: message }} />
					)}
				</Status>
			</Inputs>
		</form>
	);
};

const mailchimpURL = process.env.MAILCHIMP || "";

const Newsletter = ({ onSubmit = () => {}, ...props }) => (
	<MailchimpSubscribe
		url={mailchimpURL}
		render={({ subscribe, status, message }) => (
			<CustomForm
				status={status}
				message={message}
				onValidated={subscribe}
				url={mailchimpURL}
				onSubmit={onSubmit}
				{...props}
			/>
		)}
	/>
);

export default Newsletter;
