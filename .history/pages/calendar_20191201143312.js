import React from "react";

import Head from "next/head";
import Page from "../components/shared/page";

export default () => (
	<Page>
		<Head>
			<Head>
				<title>{this.props.page.title} – DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${this.props.page.title} – DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content={
						this.props.page.image
							? this.props.page.image.fields.file.url
							: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content={`${this.props.page.title} – DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content={
						this.props.page.image
							? this.props.page.image.fields.file.url
							: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>
			<Header title="dotwatcher.cc" />
		</Head>

		<h1>Hello</h1>
	</Page>
);
