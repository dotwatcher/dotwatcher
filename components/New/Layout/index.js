import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";
import dim from "@Utils/dim";
import { useRef } from "react";
import ReturnToTop from "@Components/UI//ReturnTop";
import Image from "next/image";

const Button = styled(ReturnToTop)`
	display: unset !important;
	position: fixed !important;
	width: 50px !important;
	height: 50px !important;
`;

const Page = styled.article`
	padding: ${dim(1)};
	position: relative;
`;

const Layout = ({ children, user }) => {
	const ref = useRef(null);

	const handleTopClick = () => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<Page ref={ref}>
			<Header user={user} />

			{children}
			<Footer />
			<Button onClick={handleTopClick} title="Scroll to top">
				<Image src="/static/icons/up-arrow.svg" width={40} height={40} />
			</Button>
		</Page>
	);
};

export default Layout;
