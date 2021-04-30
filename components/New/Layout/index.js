import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";
import dim from "@Utils/dim";
import { useRef } from "react";
import ReturnToTop from "@Components/UI//ReturnTop";
import Image from "next/image";
import Head from "next/head";
import { HEAD } from "@Utils/contstants";

import NewsletterModal from "./newsletter";
import CookiePolicy from "./cookiePolicy";

const Button = styled(ReturnToTop)`
	display: unset !important;
	position: fixed !important;
	width: 50px !important;
	height: 50px !important;
	padding: 10px;
	box-shadow: 0 0 3px 1px rgba(151, 151, 151, 1);
	bottom: ${dim()};
	right: ${dim()};
`;

const Page = styled.article`
	padding: ${dim(1)};
	position: relative;
`;

const Layout = ({ children, user, hideLayout }) => {
	const ref = useRef(null);

	const handleTopClick = () => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const description =
		"DotWatcher is here to showcase the best of long distance self-supported bike racing";

	return (
		<Page ref={ref}>
			<Head>
				<link rel="stylesheet" href="/static/index.css" />

				<title key={HEAD.TITLE}>DotWatcher.cc</title>

				<meta key={HEAD.DESCRIPTION} name="description" content={description} />

				<meta
					key={HEAD.OG_DESC}
					property="og:description"
					content={description}
				/>

				<meta key={HEAD.OG_TITLE} property="og:title" content="DotWatcher.cc" />

				<meta
					key={HEAD.OG_IMAGE}
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>

				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/static/dw-pin-16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/static/dw-pin-32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/static/dw-pin-96.png"
				/>
				<link rel="apple-touch-icon" href="/static/dw-pin-120.png" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/static/dw-pin-180.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/static/dw-pin-152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="167x167"
					href="/static/dw-pin-167.png"
				/>

				<link rel="manifest" href="/manifest.json" />
				<meta name="application-name" content="DotWatcher.cc" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="DotWatcher.cc" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-TileColor" content="#4961AF" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#4961AF" />

				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap"
					rel="stylesheet"
				/>
			</Head>

			{!hideLayout && <Header user={user} />}

			{children}

			{!hideLayout && (
				<>
					<Footer />

					<Button onClick={handleTopClick} title="Scroll to top">
						<Image
							src="/static/icons/up-arrow.svg"
							width={40}
							height={40}
							alt="Scroll to top"
						/>
					</Button>

					<NewsletterModal />

					<CookiePolicy />
				</>
			)}
		</Page>
	);
};

export default Layout;
