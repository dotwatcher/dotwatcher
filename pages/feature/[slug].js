import React, { Fragment } from "react";

import Head from "next/head";

import styled, { css } from "styled-components";
import Link from "next/link";

import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import P from "@Components/UI/P";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import client from "@Utils/apollo";
import dim from "@Utils/dim";
import color from "@Utils/colors";
import mq from "@Utils/media-query";
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
import { useRouter } from "next/router";

const Avatar = styled.div`
	img {
		border-radius: 100%;
	}
`;

const Content = styled.article`
	${mq.mdUp`
		display: grid;
		grid-column-gap: ${dim(2)};
		grid-template-columns: minmax(0, 60%) minmax(0, 40%);
	`}
`;

const Aside = styled.aside`
	align-self: start;
	position: sticky;
	top: ${dim()};
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

const Block = styled.div(props => {
	const splitLayouts = ["Image Left", "Image Right"];

	const hasColumns = splitLayouts.some(
		layout =>
			props.layout && layout.toLowerCase() === props.layout.toLowerCase()
	);

	return `

		${mq.mdUp`
			display: flex;
		`}

		gap: ${dim()};
		align-items: start;

		& + & {
			margin-top: ${dim()};
			padding-top: ${dim(2)};
			border-top: 1px solid ${color.lightgrey};
		}

		&:last-child {
			margin-bottom: ${dim()};
			padding-bottom: ${dim(2)};
			border-bottom: 1px solid ${color.lightgrey};
		}

		${hasColumns &&
			css`
				& > * {
					flex: 1 1 0;
				}
			`}

		${hasColumns &&
			props.layout &&
			props.layout.toLowerCase() === "Image left" &&
			css`
				flex-direction: row-reverse;
			`}
	`;
});

const Feature = ({ data }) => {
	const [feature] = data.featureCollection.items;
	const [featureCollection] = feature.featureCategoriesCollection.items;
	const router = useRouter();

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
										src={
											block.image.url +
											`?w=${block.image.width}&h=${block.image.height}&fit=fill`
										}
										width={block.image.width}
										height={block.image.height}
									/>
								)}
							</Block>
						))}
					</div>

					<Aside>
						{feature.relatedCollection.items.length > 0 && (
							<AlsoBlock>
								<H3>Related Features</H3>
								<AlsoGrid>
									{feature.relatedCollection.items.map((feature, ind) => (
										<GridItem key={ind}>
											<Link href={`/feature/${feature.slug}`}>
												<a title={feature.title}>
													<Image
														src={
															feature.featuredImage.url +
															"?w=300&h=200&fit=fill"
														}
														width={300}
														height={200}
													/>
													<p>{feature.title}</p>
												</a>
											</Link>
										</GridItem>
									))}
								</AlsoGrid>
							</AlsoBlock>
						)}

						{featureCollection && (
							<AlsoBlock>
								<H3>Also from {featureCollection.name}</H3>
								<AlsoGrid>
									{featureCollection.linkedFrom.featureCollection.items
										.filter(item => item.slug !== router.query.slug)
										.slice(0, 2)
										.map((feature, ind) => (
											<div key={ind}>
												<Link href={`/feature/${feature.slug}`}>
													<a title={feature.title}>
														<Image
															src={
																feature.featuredImage.url +
																"?w=300&h=200&fit=fill"
															}
															width={300}
															height={200}
															alt={feature.title}
														/>
														<p>{feature.title}</p>
													</a>
												</Link>
											</div>
										))}
								</AlsoGrid>
							</AlsoBlock>
						)}
					</Aside>
				</Content>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async ctx => {
	try {
		const { data } = await client.query({
			variables: {
				slug: ctx.query.slug,
				preview: !!process.env.CONTENTFUL_PREVIEW
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
								title
								width
								height
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

				query getFeature($slug: String!, $preview: Boolean) {
					featureCollection(
						preview: $preview
						limit: 1
						where: { slug: $slug }
					) {
						items {
							...feature
							featureCategoriesCollection(limit: 10) {
								items {
									name
									slug
									linkedFrom {
										featureCollection {
											items {
												slug
												title
												featuredImage {
													url
													title
												}
											}
										}
									}
								}
							}
							relatedCollection(limit: 2) {
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
