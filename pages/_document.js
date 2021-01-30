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
				<Head>{this.props.styleTags}</Head>
				<body>
					<Main />
					<NextScript />
				</body>

				<script src="//www.instagram.com/embed.js" />
			</Html>
		);
	}
}
