import Button from "@Components/UI/Button";
import styled from "styled-components";
import colors from "@Utils/colors";
import P from "@Components/UI/P";
import dim from "@Utils/dim";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Article = styled.article`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	background-color: ${colors.white};
	box-shadow: 0px 0px 20px 0px rgba(151, 151, 151, 1);
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: ${dim(2)} 0;
	z-index: 1;
`;

const Copy = styled.div`
	width: 60%;
`;

const COOKIE = "accept_cookie_policy";
const CookiePolicy = () => {
	const [accepted, setAccepted] = useState(true);

	useEffect(() => {
		const hasAccepted = Cookies.get(COOKIE);

		if (!hasAccepted) {
			setAccepted(false);
		}
	}, []);

	if (accepted) return null;

	const handleClick = () => {
		setAccepted(true);

		Cookies.set(COOKIE, true, { expires: 30 });
	};

	return (
		<Article>
			<Copy>
				<P>
					We use cookies to improve our site and your browsing experience. By
					continuing to browse our site you accept this policy. You can delete
					and block the cookies by changing your browser&nbsp;settings.
				</P>
			</Copy>

			<div>
				<Button
					type="button"
					title="Accept cookie policy"
					onClick={handleClick}
				>
					Accept
				</Button>
			</div>
		</Article>
	);
};
export default CookiePolicy;
