import React, { useEffect, useRef } from "react";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const H1 = styled.h1`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const Iframe = styled.iframe`
	width: 100%;
	height: 2500px;
	border: 0;
	border: none;
	${tachyons};
`;

export default () => (
	<Page>
		<Head>
			<title>Digest - DotWatcher.cc</title>
			<meta property="og:title" content="Digest - DotWatcher.cc" />
			<meta
				property="og:description"
				content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
			/>
			<meta
				property="og:image"
				content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
			/>
		</Head>

		<Header title="dotwatcher.cc" />

		<Div mt3 mt4_l mh6_l>
			<H1 f3 f1_l fw6 lh_title mb4>
				Dotwatcher Digest
			</H1>
			<Iframe src="/digest-archive" />
		</Div>
		<Footer />
	</Page>
);
