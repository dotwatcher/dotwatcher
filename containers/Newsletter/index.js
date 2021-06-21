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
import { useState } from "react";
import Axios from "axios";

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

const Newsletter = ({
	status,
	message,

	showPastIssues = true,
	onSubmit = () => {}
}) => {
	const [cookies, setCookie] = useCookies(["hideSignup"]);
	const [emailValue, setEmailValue] = useState("");
	const [error, setError] = useState("");

	if (message && message.startsWith("0 - ")) {
		message = message.split("0 - ")[1];
	}

	const markAsSignedUp = () => {
		setCookie("hideSignup", true, {
			path: "/",
			maxAge: 31557600 // 1 year in seconds
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await Axios.get(`/api/mailchimp/subscribe/${emailValue}`);

			await onSubmit();
			await markAsSignedUp();

			logEvent("Subscribed", location.pathname, "footer");
		} catch (error) {
			setError("There was an issue subscribing you to our mailing list");
		}
	};

	const handleInputChange = e => {
		setEmailValue(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Inputs>
				<StyledInput>
					<Input
						type="email"
						name="email"
						placeholder="Email Address"
						value={emailValue}
						onChange={handleInputChange}
					/>
					{showPastIssues && (
						<PastIssues>
							<Link href="/digest" passHref>
								<A>Discover past issues</A>
							</Link>
						</PastIssues>
					)}
				</StyledInput>

				<StyledSubmit type="submit">Subscribe</StyledSubmit>

				<Status>{error && <StyledError>{error}</StyledError>}</Status>
			</Inputs>
		</form>
	);
};

export default Newsletter;
