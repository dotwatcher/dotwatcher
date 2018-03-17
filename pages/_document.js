import React from 'react';
import NextDocument, {Head, Main, NextScript} from 'next/document';
import styled, {ServerStyleSheet} from 'styled-components';
import tachyons from 'styled-components-tachyons';
import stylesheet from '../styles/index.css';

const Body = styled.body`${tachyons}`;

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
				<Body sans_serif near_black pa0 ma0>
					<Main/>
					<NextScript/>
				</Body>
			</html>
		);
	}
}
