import React, { useState } from "react";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 56.25%;
	margin: var(--spacing-large);
`;

const Iframe = styled.iframe`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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

		<Wrapper>
			<Iframe src="/digest-archive" />
		</Wrapper>
		<Footer />
	</Page>
);
