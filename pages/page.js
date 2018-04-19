import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown-with-shortcodes';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../components/embed';
import Header from '../components/header';
import Page from '../components/shared/page';
import Wrapper from '../components/shared/wrapper';
import {withPage} from '../data/with-page';

const Div = styled.div`${tachyons}`;
const H1 = styled.h1`${tachyons}`;

class ContentPage extends React.Component {
	render() {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>{this.props.page.title}</title>
					<meta property="og:title" content={this.props.page.title}/>
					<meta property="og:image" content=""/>
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Wrapper mt5 ph4>
					<H1 f2 lh_title>
						{this.props.page.title}
					</H1>
					<Div measure lh_copy pb3>
						<ReactMarkdown
							source={this.props.page.text}
							plugins={[shortcodes]}
							renderers={{shortcode: Embed}}
						/>
					</Div>
				</Wrapper>
			</Page>
		);
	}
}

ContentPage.propTypes = {
	page: PropTypes.object.isRequired
};

export default withPage(ContentPage);
