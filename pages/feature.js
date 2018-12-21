import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../components/embed';
import Header from '../components/header';
import Footer from '../components/footer';
import ContentBlock from '../components/content-block';
import Carousel from '../components/carousel';
import Page from '../components/shared/page';
import {withFeature} from '../data/with-feature';
import widont from '../utils/widont';

const Div = styled.div`
	p {
		margin: 0;
	}
${tachyons}`;
const H1 = styled.h1`${tachyons}`;

class FeaturePage extends React.Component {
	render() {
		const StyledWrapper = styled.div`
			background-image: ${this.props.feature.image ? `url(${this.props.feature.image.fields.file.url})` : 'none' };
			background-repeat: no-repeat;
			background-size: cover;
			height: ${this.props.feature.image ? `75vh` : `20vh`};

			&> h1 {
				background-color: rgba(255, 255, 255, .66)
			}
		${tachyons}`

		const carouselSlides = this.props.feature.blocks.filter(block => block.layout === 'Carousel slide');
		const carousel = carouselSlides.length ? <Carousel slides={carouselSlides}/> : null;
		const blocksWithoutSlides = this.props.feature.blocks.filter(block => block.layout !== 'Carousel slide');
		return (
			<Page>
				<Head>
					<title>{this.props.feature.title} - dotwatcher.cc</title>
					<meta property="og:title" content={`${this.props.feature.title} - dotwatcher.cc`}/>
					<meta property="og:description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing."/>
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"/>
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<StyledWrapper fl w_100 />
				<H1 f2 f_headline_ns fw6 lh_solid mv0 ml5>
					{ widont(this.props.feature.title) }
				</H1>
				<Div fl w_100 mt3 mt4_l cf>
					{carousel}
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

FeaturePage.propTypes = {
	feature: PropTypes.object.isRequired
};

export default withFeature(FeaturePage);
