import React from "react";

import Head from "next/head";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Newsletter from "@Containers/Newsletter";
import Center from "@Components/UI/Center";
import H1 from "@Components/UI/H1";
import Section from "@Components/UI/Section";
import dim from "@Utils/dim";

const NewsletterWrap = styled.div`
	max-width: 800px;
	margin-bottom: ${dim(5)};
`;

const Iframe = styled.iframe`
	width: 100%;
	height: 2500px;
	border: 0;
	border: none;
	${tachyons};
`;

const Digest = () => (
	<>
		<Head>
			<title>Digest - DotWatcher.cc</title>
			<meta property="og:title" content="Digest - DotWatcher.cc" />
		</Head>

		<Section>
			<H1>
				<Center>Dotwatcher Digest</Center>
			</H1>
		</Section>

		<Section>
			<NewsletterWrap>
				<Newsletter showPastIssues={false} />

				<p>
					Sign up to Dotwatcher Digest or view the previous editions&nbsp;below.
				</p>
			</NewsletterWrap>
		</Section>

		<Iframe src="/digest/archive" />
	</>
);

export default Digest;
