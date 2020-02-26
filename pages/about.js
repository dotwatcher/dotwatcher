import React from "react";

import Head from "next/head";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "../components/embed";
import AutoEmbed from "../components/embed/auto";
import BodyImage from "../components/image/markdown";
import Header from "../components/header";
import Footer from "../components/footer";
import ContentBlock from "../components/content-block";
import Carousel from "../components/carousel";
import Page from "../components/shared/page";
import { withAbout } from "../data/with-about";
import widont from "../utils/widont";
import ContributorsGrid from "../components/contributor-info/grid";

const Div = styled.div`
	p {
		margin: 0;
	}
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;

class AboutPage extends React.Component {
	render() {
		const StyledWrapper = styled.div`
			background-image: ${this.props.page.image
				? `url(${this.props.page.image.fields.file.url})`
				: "none"};
			background-repeat: no-repeat;
			background-size: cover;
			padding: ${this.props.page.image
					? `var(--spacing-extra-extra-large)`
					: ``}
				0;

			& > div {
				background-color: rgba(255, 255, 255, 0.66);
			}
			${tachyons}
		`;

		const carouselSlides = this.props.page.blocks.filter(
			block => block.layout === "Carousel slide"
		);
		const carousel = carouselSlides.length ? (
			<Carousel slides={carouselSlides} />
		) : null;
		const blocksWithoutSlides = this.props.page.blocks.filter(
			block => block.layout !== "Carousel slide"
		);
		return (
			<Page>
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
				<StyledWrapper fl w_100>
					<Div fl mt5_ns pa3 pa4_ns pl5_ns>
						<H1 f2 f1_ns fw6 lh_solid mt0 mb4>
							{widont(this.props.page.title)}
						</H1>
						<Div f4 f3_ns measure lh_copy>
							<ReactMarkdown
								source={this.props.page.text}
								plugins={[shortcodes]}
								renderers={{
									shortcode: Embed,
									link: AutoEmbed,
									image: BodyImage
								}}
							/>
						</Div>
					</Div>
				</StyledWrapper>
				<Div fl w_100 mt3 mt4_l cf>
					{carousel}
					{blocksWithoutSlides.map(block => {
						return <ContentBlock key={block.sys.id} block={block} />;
					})}
					<ContributorsGrid contributors={this.props.contributors} />
				</Div>
				<Footer />
			</Page>
		);
	}
}

AboutPage.propTypes = {
	page: PropTypes.object.isRequired
};

export default withAbout(AboutPage);
