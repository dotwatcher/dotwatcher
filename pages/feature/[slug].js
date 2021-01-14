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

import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import P from "@Components/UI/P";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import H4 from "@Components/UI/H4";
import client from "@Utils/apollo";
import dim from "@Utils/dim";
import color from "@Utils/colors";
import { gql } from "@apollo/client";
import Image from "next/image";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import {
	Image as BodyImage,
	ShortCode,
	Link as MarkdownLink
} from "@ComponentsNew/Markdown";

const Avatar = styled.div`
	img {
		border-radius: 100%;
	}
`;

const Content = styled.article`
	display: grid;
	grid-template-columns: 60% 40%;
	grid-column-gap: ${dim(2)};
`;

const AlsoGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 50%;
	grid-column-gap: ${dim()};
`;

const AlsoBlock = styled.div`
	& + & {
		margin-top: ${dim()};
		padding-top: ${dim()};
		border-top: 1px solid ${color.lightgrey};
	}
`;

const GridItem = styled.div`
	max-width: 100%;
`;

const Block = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	align-items: start;
	grid-column-gap: ${dim()};

	& + & {
		margin-top: ${dim()};
		padding-top: ${dim(2)};
		border-top: 1px solid ${color.lightgrey};
	}
`;

// const RelatedGrid = styled.div`
// 	display: grid;
// 	grid-gap: var(--spacing-medium);
// 	grid-template-columns: 1fr 1fr;
// 	${tachyons}
// `;
// const Comments = styled.div`
// 	margin: 0 var(--spacing-medium);
// 	@media screen and (min-width: 48em) {
// 		margin: 0 var(--spacing-extra-extra-large);
// 	}
// 	${tachyons}
// `;

// const Feature = styled.article`
// 	${tachyons};

// 	${mq.smUp`
// 		display: grid;
// 		grid-template-columns: 70% 30%;
// 	`}
// `;

// const RelatedFeatures = styled.div`
// 	display: inline-block;

// 	${mq.smUp`
// 		position: sticky;
// 		/* Off set site header */
// 		top: 80px;
// 	`};
// `;
// class FeaturePage extends React.Component {
// 	static propTypes = {
// 		cookies: instanceOf(Cookies).isRequired
// 	};

// 	constructor(props) {
// 		super(props);
// 	}

// 	render() {
// 		const StyledWrapper = styled.div`
// 			background-image: ${this.props.feature.image
// 				? `url(${this.props.feature.featuredImage.url}?w=800&q=60)`
// 				: "none"};
// 			background-repeat: no-repeat;
// 			background-size: cover;
// 			background-position: ${this.props.feature.imageAnchor
// 					? this.props.feature.imageAnchor
// 					: "center"}
// 				center;
// 			height: ${this.props.feature.image ? `35vh` : `20vh`};

// 			& > h1 {
// 				background-color: rgba(255, 255, 255, 0.66);
// 			}
// 			@media screen and (min-width: 48em) {
// 				height: ${this.props.feature.image ? `75vh` : `20vh`};
// 				background-image: ${this.props.feature.image
// 					? `url(${this.props.feature.featuredImage.url}?w=1024&q=60)`
// 					: "none"};
// 			}
// 			@media screen and (min-width: 64em) {
// 				background-image: ${this.props.feature.image
// 					? `url(${this.props.feature.featuredImage.url}?w=1200&q=60)`
// 					: "none"};
// 			}
// 			@media screen and (min-width: 75em) {
// 				background-image: ${this.props.feature.image
// 					? `url(${this.props.feature.featuredImage.url}?w=1600&q=80)`
// 					: "none"};
// 			}
// 			${tachyons}
// 		`;

// 		const carouselSlides = this.props.feature.blocks.filter(
// 			block => block.layout === "Carousel slide"
// 		);
// 		const carousel = carouselSlides.length ? (
// 			<Carousel slides={carouselSlides} />
// 		) : null;

// 		const blocksWithoutSlides = this.props.feature.blocks.filter(
// 			block => block.layout !== "Carousel slide"
// 		);

// 		const disqusShortname = "dotwatcher";
// 		const disqusConfig = {
// 			url: `https://dotwatcher.cc/feature/${this.props.feature.slug}`,
// 			identifier: this.props.feature.id,
// 			title: this.props.feature.title
// 		};

// 		return (
// 			<React.Fragment>
// 				<Head>
// 					<title>{this.props.feature.title} – DotWatcher.cc</title>
// 					<meta
// 						property="og:title"
// 						content={`${this.props.feature.title} – DotWatcher.cc`}
// 					/>
// 					<meta
// 						property="og:description"
// 						content={
// 							this.props.feature.excerpt
// 								? this.props.feature.excerpt
// 								: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
// 						}
// 					/>
// 					<meta
// 						property="og:image"
// 						content={
// 							this.props.feature.image
// 								? `${this.props.feature.featuredImage.url}?w=600&fm=jpg&q=70`
// 								: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
// 						}
// 					/>
// 					<meta name="twitter:card" content="summary_large_image" />
// 					<meta name="twitter:site" content="@dotwatcher" />
// 					<meta name="twitter:creator" content="@dotwatcher" />
// 					<meta
// 						name="twitter:title"
// 						content={`${this.props.feature.title} – DotWatcher.cc`}
// 					/>
// 					<meta
// 						name="twitter:description"
// 						content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
// 					/>
// 					<meta
// 						name="twitter:image"
// 						content={
// 							this.props.feature.image
// 								? `${this.props.feature.featuredImage.url}?w=600&fm=jpg&q=70`
// 								: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
// 						}
// 					/>
// 					<meta
// 						name="description"
// 						content={
// 							this.props.feature.excerpt
// 								? this.props.feature.excerpt
// 								: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
// 						}
// 					/>
// 				</Head>

// 				<Heading mh3 mh6_ns>
// 					<H1 f2 f_subheadline_m f_headline_l fw6 lh_solid mv0 mh3>
// 						{this.props.feature.title}
// 					</H1>
// 				</Heading>
// 				{this.props.feature.contributor ? (
// 					<ContributorInfo contributor={this.props.feature.contributor} />
// 				) : null}
// 				<Div mt3 mt4_l cf>
// 					{carousel}
// 				</Div>
// 				<Feature mt3 mt4_l>
// 					<Div>
// 						{this.props.feature.comments ? (
// 							<Comments>
// 								<A
// 									link
// 									near_black
// 									hover_blue
// 									underline
// 									db
// 									mh3
// 									mb4
// 									href="#comments"
// 								>
// 									<CommentCount
// 										shortname={disqusShortname}
// 										config={disqusConfig}
// 									>
// 										0 Comments
// 									</CommentCount>
// 								</A>
// 							</Comments>
// 						) : null}
// 						{/*blocksWithoutSlides.map(block => {
// 							return (
// 								<ContentBlock key={block.sys.id} block={block} feature={true} />
// 							);
// 						})*/}
// 						{this.props.feature.comments ? (
// 							<Comments fl w_90 w_70_ns id="comments">
// 								<Div pa3 measure_wide>
// 									<DiscussionEmbed
// 										shortname={disqusShortname}
// 										config={disqusConfig}
// 									/>
// 								</Div>
// 							</Comments>
// 						) : null}
// 					</Div>
// 					{
// 						<Div ph3 pl0_l>
// 							<RelatedFeatures>
// 								{this.props.cookies.cookies.hideSignup === undefined ? (
// 									<EmailSignup layout="small" />
// 								) : null}

// 								{this.props.feature.related.length > 0 ? (
// 									<Fragment>
// 										<H2 ma0 mb3 f3>
// 											Related features
// 										</H2>
// 										<RelatedGrid>
// 											{this.props.feature.related.map(relation => (
// 												<Link
// 													href={`/feature?slug=${relation.fields.slug}`}
// 													passHref
// 													key={relation.sys.id}
// 												>
// 													<A link db near_black hover_blue>
// 														<Image
// 															src={
// 																relation.fields.featuredImage.fields.file.url
// 															}
// 															width={256}
// 															height={200}
// 														/>
// 														<H3 f5>{relation.fields.title}</H3>
// 													</A>
// 												</Link>
// 											))}
// 										</RelatedGrid>
// 									</Fragment>
// 								) : null}
// 							</RelatedFeatures>
// 						</Div>
// 					}
// 				</Feature>
// 			</React.Fragment>
// 		);
// 	}
//
// }

const Feature = ({ data }) => {
	const [feature] = data.featureCollection.items;
	const [featureCollection] = feature.featureCategoriesCollection.items;

	return (
		<Fragment>
			<Head>
				<title>{feature.title} – DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${feature.title} – DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content={
						feature.excerpt
							? feature.excerpt
							: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
					}
				/>
				<meta
					property="og:image"
					content={
						feature.image
							? `${feature.featuredImage.url}?w=600&fm=jpg&q=70`
							: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content={`${feature.title} – DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					name="twitter:image"
					content={
						feature.image
							? `${feature.featuredImage.url}?w=600&fm=jpg&q=70`
							: "https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					}
				/>
				<meta
					name="description"
					content={
						feature.excerpt
							? feature.excerpt
							: "DotWatcher is here to showcase the best of long distance self-supported bike racing."
					}
				/>
			</Head>

			{feature.featuredImage && (
				<Section>
					<Image
						src={feature.featuredImage.url + "?w=2000&h=800&fit=fill"}
						height={800}
						width={2000}
						alt={feature.title}
						title={feature.title}
					/>
				</Section>
			)}

			<Section>
				<Center>
					<H1>{feature.title}</H1>
					<P>{moment(feature.sys.firstPublishedAt).format("MMMM Do YYYY")}</P>

					{feature.contributor && (
						<Fragment>
							<P>
								<Link
									href={`/contributor/${feature.contributor.slug}`}
									passHref
								>
									<a>
										<Avatar>
											<Image
												src={feature.contributor.avatar.url + "?w=100&h=100"}
												width={100}
												height={100}
												alt={feature.contributor.name}
												title={feature.contributor.name}
											/>
										</Avatar>
									</a>
								</Link>
							</P>

							<P>
								<Link
									href={`/contributor/${feature.contributor.slug}`}
									passHref
								>
									<a>By: {feature.contributor.name}</a>
								</Link>
							</P>
						</Fragment>
					)}
				</Center>
			</Section>

			<Section>
				<Content>
					<div>
						{feature.contentBlockCollection.items.map((block, ind) => (
							<Block layout={block.layout} key={ind}>
								<div>
									{block.heading && <H2>{block.heading}</H2>}
									<ReactMarkdown
										source={block.words}
										plugins={[shortcodes]}
										renderers={{
											shortcode: ShortCode,
											link: MarkdownLink,
											image: BodyImage
										}}
									/>
								</div>
								{block.image && (
									<Image
										src={block.image.url + "?w=900&h=600&fit=fill"}
										width={900}
										height={600}
									/>
								)}
							</Block>
						))}
					</div>

					<aside>
						{feature.relatedCollection.items.length > 0 && (
							<AlsoBlock>
								<H3>Related Features</H3>
								<AlsoGrid>
									{feature.relatedCollection.items.map((feature, ind) => (
										<GridItem key={ind}>
											<Image
												src={
													feature.featuredImage.url + "?w=300&h=200&fit=fill"
												}
												width={300}
												height={200}
											/>
											<p>{feature.title}</p>
										</GridItem>
									))}
								</AlsoGrid>
							</AlsoBlock>
						)}

						{console.log(feature.relatedCollection.items)}

						{featureCollection && (
							<AlsoBlock>
								<H3>Also from {featureCollection.name}</H3>
								<AlsoGrid>
									{featureCollection.linkedFrom.featureCollection.items.map(
										(feature, ind) => (
											<div key={ind}>
												<Image
													src={
														feature.featuredImage.url + "?w=300&h=200&fit=fill"
													}
													width={300}
													height={200}
												/>
												<p>{feature.title}</p>
											</div>
										)
									)}
								</AlsoGrid>
							</AlsoBlock>
						)}
					</aside>
				</Content>
			</Section>
		</Fragment>
	);
};
export const getServerSideProps = async ctx => {
	try {
		const { data } = await client.query({
			variables: {
				slug: ctx.query.slug
			},
			query: gql`
				fragment feature on Feature {
					title
					sys {
						firstPublishedAt
					}
					contentBlockCollection {
						items {
							heading
							words
							layout
							image {
								url
							}
						}
					}
					featuredImage {
						url
					}
					contributor {
						name
						slug
						avatar {
							url
						}
					}
				}

				query getFeature($slug: String!) {
					featureCollection(preview: true, limit: 1, where: { slug: $slug }) {
						items {
							...feature
							featureCategoriesCollection(limit: 10) {
								items {
									name
									slug
									linkedFrom {
										featureCollection {
											items {
												title
												featuredImage {
													url
												}
											}
										}
									}
								}
							}
							relatedCollection(limit: 4) {
								items {
									...feature
								}
							}
						}
					}
				}
			`
		});

		if (data.featureCollection.items.length < 1) {
			return {
				notFound: true
			};
		}

		return {
			props: { data }
		};
	} catch (error) {
		console.log(error);

		return {
			notFound: true
		};
	}
};

export default Feature;
