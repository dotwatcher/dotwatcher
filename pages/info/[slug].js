import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Page from "../../components/shared/page";
import withInfoPage from "../../data/with-info-page";
import { Div, H1 } from "../../components/UI/Tachyons";

const Info = ({ page, user }) => {
	if (!page) {
		return (
			<Page>
				<Head>
					<title>Info - DotWatcher.cc</title>
					<meta property="og:title" content="DotWatcher.cc" />
					<meta
						property="og:description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>
					<meta
						property="og:image"
						content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher" />
					<meta name="twitter:creator" content="@dotwatcher" />
					<meta name="twitter:title" content={`Info DotWatcher.cc`} />
					<meta
						name="twitter:description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>
					<meta
						property="og:image"
						content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					/>
					<meta
						name="description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>
				</Head>
				<Header user={user} title="dotwatcher.cc" />

				<Div mt3 mt4_l mh6_l>
					<h1>Page not Found</h1>
				</Div>

				<Footer />
			</Page>
		);
	}
	return (
		<Page>
			<Head>
				<title>{page.fields.title} – DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${page.fields.title} – DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={`${page.title} – DotWatcher.cc`} />
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>
			<Header user={user} title="dotwatcher.cc" />

			<Div mt3 mt4_l mh6_l>
				<H1>{page.fields.title}</H1>
				{documentToReactComponents(page.fields.content)}
			</Div>

			<Footer />
		</Page>
	);
};

export default withInfoPage(Info);
