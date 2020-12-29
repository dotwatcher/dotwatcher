import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";
import dim from "@Utils/dim";

const Page = styled.article`
	padding: ${dim(1)};
`;

const Layout = ({ children, user }) => {
	return (
		<Page>
			<Header user={user} />

			{children}

			<Footer />
		</Page>
	);
};

export default Layout;
