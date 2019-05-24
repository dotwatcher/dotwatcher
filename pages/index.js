import React, { Component } from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../components/embed';
import AutoEmbed from '../components/embed/auto';
import Header from '../components/header';
import Footer from '../components/footer';
import ContentBlock from '../components/content-block';
import Grid from '../components/grid';
import Homepage from '../components/content-block/homepage';
import Page from '../components/shared/page';
import {withHomepage} from '../data/with-homepage';
import widont from '../utils/widont';
import Link from 'next/link';

const Div = styled.div`
	p {
		margin: 0;
	}
${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const A = styled.a`${tachyons}`;
const SVG = styled.svg`${tachyons}`;

class App extends Component {
	render() {
		const StyledWrapper = styled.div`
			background-image: ${this.props.page.image ? `url(${this.props.page.image.fields.file.url})` : 'none' };
			background-repeat: no-repeat;
			background-size: cover;
			padding: ${this.props.page.image ? `var(--spacing-extra-extra-large)` : ``} 0;

			&> div {
				background-color: rgba(255, 255, 255, .66)
			}
		${tachyons}`

		const homepageBlock = this.props.page.blocks.filter(block => block.layout === 'Homepage')[0];
		const gridBlocks = this.props.page.blocks.filter(block => block.layout === 'Carousel slide');
		const grid = gridBlocks.length ? <Grid blocks={gridBlocks}/> : null;
		const blocksWithoutSlides = this.props.page.blocks.filter(block => block.layout !== 'Carousel slide').filter(block => block.layout !== 'Homepage');
		return (
			<Page>
				<Head>
					<title>Long distance bike race coverage – DotWatcher.cc</title>
					<meta property="og:title" content="Long distance bike race coverage – DotWatcher.cc"/>
					<meta property="og:description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing."/>
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher"/>
					<meta name="twitter:creator" content="@dotwatcher"/>
					<meta name="twitter:title" content="Long distance bike race coverage – DotWatcher.cc"/>
					<meta name="twitter:description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing." />
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"/>
					<meta name="description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing." />
				</Head>
				<Header
					title="dotwatcher.cc — Long distance self-supported bike race coverage"
				/>
				<Div fl w_100 mt3 mt4_l className="cf">
					{homepageBlock ? <Homepage block={homepageBlock} /> : null}

					<Div mb4 mb5_l className="cf">
						<Div w_90 w_60_l center pa4 bg_near_white className="cf">
							<Div fl w_20 pr3 pr4_m pr5_l>
								<SVG w_100 viewBox="0 0 21 37" xmlns="http://www.w3.org/2000/svg"><g fill="#1A1918" fill-rule="evenodd"><path d="M7.703 5.444l4.58 7.956 2.43-4.225 4.409 7.657c.882-2.47 1.47-4.627 1.47-5.982 0-5.665-4.597-10.278-10.245-10.278C4.699.572.1 5.184.1 10.85c0 1.268.524 3.248 1.313 5.522l6.29-10.928z" /><path d="M14.715 12.31l-1.531 2.659 3.956 6.873c.446-1.048.876-2.093 1.271-3.108l-3.696-6.424zM8.626 10.183L6.776 13.4l-.925-1.605-3.739 6.495c2.701 7.07 7.196 15.828 7.46 16.345l.774 1.485.758-1.485c.21-.39 2.826-5.489 5.26-11.005L8.626 10.183z" /></g></SVG>
							</Div>
							<H1 f2 f1_ns fw6 lh_solid mt0 mb3>
								{
									this.props.page.title
								}
							</H1>
							<Div f4 f3_ns measure lh_copy fr_ns w_80_ns>
								<ReactMarkdown
									source={this.props.page.text}
									plugins={[shortcodes]}
									renderers={{
										shortcode: Embed,
										link: AutoEmbed
									}}
								/>
								<Link href="/about" as="/about" passHref>
									<A link blue hover_near_black mt3 db>
										Learn more »
									</A>
								</Link>
							</Div>
						</Div>
					</Div>

					{ grid }
					{
						blocksWithoutSlides.map(block => {
							return (
								<ContentBlock
									key={block.sys.id}
									block={block}
								/>
							);
						})
					}
				</Div>
				<Footer/>
			</Page>
		);
	}
}

App.propTypes = {
	page: PropTypes.object
};

App.defaultProps = {
	page: {}
};

export default withHomepage(App);
