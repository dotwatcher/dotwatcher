import React, { Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import H1 from "@Components/UI/H1";
import H3 from "@Components/UI/H3";
import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import Link from "next/link";
import Image from "next/image";
import mq from "@Utils/media-query";
import dim from "@Utils/dim";

const Contributors = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: ${dim(2)};

	${mq.mdUp`
		grid-template-columns: repeat(5, 1fr);
	`}

	${mq.lgUp`
		grid-template-columns: repeat(7, 1fr);
	`}
`;

const Content = styled.div`
	${mq.mdUp`
		width: 70%;
		max-width: 1200px;
	`}
`;
const Contributor = styled.article`
	margin: 0;
	text-align: center;
`;

const AboutPage = ({ data }) => {
	const [about] = data.aboutUsCollection.items;

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: node => {
				const image = about.content.links.assets.block.find(
					block => block.sys.id === node.data.target.sys.id
				);

				if (!image) {
					console.log("Cannot find Embedded Assets: ", node);
					return null;
				}

				return (
					<Image
						width={image.width}
						height={image.height}
						src={image.url}
						title={image.title}
						alt={image.title}
					/>
				);
			}
		}
	};

	return (
		<Fragment>
			<Head>
				<title>{about.title} – DotWatcher.cc</title>
				<meta property="og:title" content={`${about.title} – DotWatcher.cc`} />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={`${about.title} – DotWatcher.cc`} />
				<meta
					name="twitter:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta
					name="description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
			</Head>

			<Section>
				<Center>
					<H1>{about.title}</H1>
				</Center>
			</Section>

			<Section>
				<Content>
					{documentToReactComponents(about.content.json, options)}
				</Content>
			</Section>

			<Section>
				<a id="contributors"></a>
				<Center>
					<H3>Our Contributors</H3>
				</Center>
				<Contributors>
					{data.contributorCollection.items.map((contributor, ind) => (
						<div>
							<Link href={`/contributor/${contributor.slug}`} passHref>
								<a>
									<Contributor>
										<Image
											width={400}
											height={400}
											alt={contributor.name}
											title={contributor.name}
											src={`${contributor.avatar.url}?w=400&h=400&fit=fill&fm=jpg&q=60&r=max`}
										/>
										<h4>{contributor.name}</h4>
									</Contributor>
								</a>
							</Link>
						</div>
					))}
				</Contributors>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async () => {
	try {
		const { data } = await client.query({
			query: gql`
				{
					aboutUsCollection(limit: 1) {
						items {
							title
							content {
								json
								links {
									assets {
										block {
											sys {
												id
											}
											url
											title
											contentType
											width
											height
										}
									}
								}
							}
						}
					}
					contributorCollection(limit: 20) {
						items {
							slug
							name
							avatar {
								url
							}
						}
					}
				}
			`
		});

		return {
			props: {
				data
			}
		};
	} catch (error) {
		console.log(error);

		return {
			notFound: true
		};
	}
};

export default AboutPage;
