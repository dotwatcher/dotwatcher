import React, { Fragment } from "react";

import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentBlock from "../../components/content-block";
import Carousel from "../../components/carousel";
import Page from "../../components/shared/page";
import ContributorInfo from "../../components/contributor-info";
import { withFeature } from "../../data/with-feature";
import EmailSignup from "../../components/content-block/email-signup";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Link from "next/link";
import { DiscussionEmbed, CommentCount } from "disqus-react";
import mq from "../../utils/media-query";

const Div = styled.div`
	p {
		margin: 0;
	}
	${tachyons}
`;
const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;
const Img = styled.img`
	${tachyons}
`;
const RelatedGrid = styled.div`
	display: grid;
	grid-gap: var(--spacing-medium);
	grid-template-columns: 1fr 1fr;
	${tachyons}
`;
const Comments = styled.div`
	margin: 0 var(--spacing-medium);
	@media screen and (min-width: 48em) {
		margin: 0 var(--spacing-extra-extra-large);
	}
	${tachyons}
`;

const Feature = styled.article`
	${tachyons};

	${mq.smUp`
		display: grid;
		grid-template-columns: 70% 30%;
	`}
`;

const RelatedFeatures = styled.div`
	display: inline-block;

	${mq.smUp`
		position: sticky;
		/* Off set site header */
		top: 80px;
	`};
`;
class FeaturePage extends React.Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const StyledWrapper = styled.div`
			background-image: ${this.props.feature.image
				? `url(${this.props.feature.image.fields.file.url}?w=800&q=60)`
				: "none"};
			background-repeat: no-repeat;
			background-size: cover;
			background-position: ${this.props.feature.imageAnchor
					? this.props.feature.imageAnchor
					: "center"}
				center;
			height: ${this.props.feature.image ? `35vh` : `20vh`};

			& > h1 {
				background-color: rgba(255, 255, 255, 0.66);
			}
			@media screen and (min-width: 48em) {
				height: ${this.props.feature.image ? `75vh` : `20vh`};
				background-image: ${this.props.feature.image
					? `url(${this.props.feature.image.fields.file.url}?w=1024&q=60)`
					: "none"};
			}
			@media screen and (min-width: 64em) {
				background-image: ${this.props.feature.image
					? `url(${this.props.feature.image.fields.file.url}?w=1200&q=60)`
					: "none"};
			}
			@media screen and (min-width: 75em) {
				background-image: ${this.props.feature.image
					? `url(${this.props.feature.image.fields.file.url}?w=1600&q=80)`
					: "none"};
			}
			${tachyons}
		`;

		const carouselSlides = this.props.feature.blocks.filter(
			block => block.layout === "Carousel slide"
		);
		const carousel = carouselSlides.length ? (
			<Carousel slides={carouselSlides} />
		) : null;
		const blocksWithoutSlides = this.props.feature.blocks.filter(
			block => block.layout !== "Carousel slide"
		);

		const disqusShortname = "dotwatcher";
		const disqusConfig = {
			url: `https://dotwatcher.cc/feature/${this.props.feature.slug}`,
			identifier: this.props.feature.id,
			title: this.props.feature.title
		};
		return (
			<Page>
				<Head>
					<title>{this.props.feature.title} – DotWatcher.cc</title>
					<meta
						property="og:title"
						content={`${this.props.feature.title} – DotWatcher.cc`}
					/>
					<meta
						property="og:description"
						content={
							this.props.feature.excerpt
								? this.props.feature.excerpt
								: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
						}
					/>
					<meta
						property="og:image"
						content={
							this.props.feature.image
								? `${this.props.feature.image.fields.file.url}?w=600&fm=jpg&q=70`
								: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
						}
					/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher" />
					<meta name="twitter:creator" content="@dotwatcher" />
					<meta
						name="twitter:title"
						content={`${this.props.feature.title} – DotWatcher.cc`}
					/>
					<meta
						name="twitter:description"
						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
					/>
					<meta
						name="twitter:image"
						content={
							this.props.feature.image
								? `${this.props.feature.image.fields.file.url}?w=600&fm=jpg&q=70`
								: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
						}
					/>
					<meta
						name="description"
						content={
							this.props.feature.excerpt
								? this.props.feature.excerpt
								: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
						}
					/>
					<script src="//www.instagram.com/embed.js" />
				</Head>
				<Header user={this.props.user} title="dotwatcher.cc" />
				<StyledWrapper w_100 />
				<Heading mh3 mh6_ns>
					<H1 f2 f_subheadline_m f_headline_l fw6 lh_solid mv0 mh3>
						{this.props.feature.title}
					</H1>
				</Heading>
				{this.props.feature.contributor ? (
					<ContributorInfo contributor={this.props.feature.contributor} />
				) : null}
				<Div mt3 mt4_l cf>
					{carousel}
				</Div>
				<Feature mt3 mt4_l>
					<Div>
						{this.props.feature.comments ? (
							<Comments>
								<A
									link
									near_black
									hover_blue
									underline
									db
									mh3
									mb4
									href="#comments"
								>
									<CommentCount
										shortname={disqusShortname}
										config={disqusConfig}
									>
										0 Comments
									</CommentCount>
								</A>
							</Comments>
						) : null}
						{blocksWithoutSlides.map(block => {
							return (
								<ContentBlock key={block.sys.id} block={block} feature={true} />
							);
						})}
						{this.props.feature.comments ? (
							<Comments fl w_90 w_70_ns id="comments">
								<Div pa3 measure_wide>
									<DiscussionEmbed
										shortname={disqusShortname}
										config={disqusConfig}
									/>
								</Div>
							</Comments>
						) : null}
					</Div>
					<Div ph3 pl0_l>
						<RelatedFeatures>
							{this.props.cookies.cookies.hideSignup === undefined ? (
								<EmailSignup layout="small" />
							) : null}
							{this.props.feature.related.length > 0 ? (
								<Fragment>
									<H2 ma0 mb3 f3>
										Related features
									</H2>
									<RelatedGrid>
										{this.props.feature.related.map(relation => (
											<Link
												href={`/feature?slug=${relation.fields.slug}`}
												as={`/feature/${relation.fields.slug}`}
												passHref
												key={relation.sys.id}
											>
												<A link db near_black hover_blue>
													<Img
														w_100
														src={`${relation.fields.featuredImage.fields.file.url}?w=256&h=256&fit=fill&fm=jpg&q=60`}
														srcSet={`${relation.fields.featuredImage.fields.file.url}?w=256&h=256&fit=fill&fm=jpg&q=60 1024w,
															${relation.fields.featuredImage.fields.file.url}?w=480&h=480&fit=fill&fm=jpg&q=60 768w,
															${relation.fields.featuredImage.fields.file.url}?w=320&h=320&fit=fill&fm=jpg&q=60 320w`}
														sizes="50vw"
													/>
													<H3 f5>{relation.fields.title}</H3>
												</A>
											</Link>
										))}
									</RelatedGrid>
								</Fragment>
							) : null}
						</RelatedFeatures>
					</Div>
				</Feature>
				<Footer />
			</Page>
		);
	}
}

FeaturePage.propTypes = {
	feature: PropTypes.object.isRequired
};

export default withFeature(withCookies(FeaturePage));