import NextDocument, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import React from 'react';
import stylesheet from '../styles/index.css';

export default class Document extends NextDocument {
	static getInitialProps ({renderPage}) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props => sheet.collectStyles(<App {...props}/>));
		const styleTags = sheet.getStyleElement();
		return {...page, styleTags};
	}

	render() {
		return (
			<html>
				<Head>
					{this.props.styleTags}
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
