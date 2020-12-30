import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";

import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production") {
	process.on("unhandledRejection", err => {
		Sentry.captureException(err);
	});

	process.on("uncaughtException", err => {
		Sentry.captureException(err);
	});
}

export default class Document extends NextDocument {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		);
		const styleTags = sheet.getStyleElement();

		return { ...page, styleTags };
	}

	render() {
		return (
			<Html>
				<Head>
					{this.props.styleTags}

					<link rel="stylesheet" href="/static/index.css" />

					<title>DotWatcher.cc</title>

					<meta
						name="description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>

					<meta
						name="og:description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>

					<meta name="og:title" content="DotWatcher.cc" />

					<meta
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

					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
