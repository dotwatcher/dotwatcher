import NextDocument, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import React from 'react';
import stylesheet from '../styles/index.css';

export default class Document extends NextDocument {
	static getInitialProps({renderPage}) {
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
					<meta name="description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing."/>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<link rel="icon" type="image/png" sizes="16x16" href="static/dw-pin-16.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="static/dw-pin-32.png"/>
					<link rel="icon" type="image/png" sizes="96x96" href="static/dw-pin-96.png"/>
					<link rel="apple-touch-icon" href="static/dw-pin-120.png"/>
					<link rel="apple-touch-icon" sizes="180x180" href="static/dw-pin-180.png"/>
					<link rel="apple-touch-icon" sizes="152x152" href="static/dw-pin-152.png"/>
					<link rel="apple-touch-icon" sizes="167x167" href="static/dw-pin-167.png"/>
					<script src="//www.instagram.com/embed.js"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
