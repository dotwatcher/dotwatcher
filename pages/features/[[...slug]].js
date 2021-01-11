import Head from "next/head";
import { Fragment } from "react";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import Section from "@Components/UI/Section";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import styled from "styled-components";
import dim from "@Utils/dim";
import color from "@Utils/colors";
import mq from "@Utils/media-query";
import Link from "next/link";
import Center from "@Components/UI/Center";

const Feature = styled.div`
	& + & {
		margin-top: ${dim(2)};
		padding-top: ${dim(2)};
		border-top: 1px solid ${color.lightgrey};
	}

	${mq.mdUp`
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-column-gap: ${dim(4)};
		align-items: center;
	`}
`;

const FeatureImage = styled.div`
	${mq.mdDown`
		text-align: center;
	`}
	grid-column: 1 / span 5;
`;
const FeatureContent = styled.div`
	grid-column: 6 / span 7;
`;

const CollectionsFlex = styled.div`
	column-count: 2;
	text-align: center;

	${mq.mdUp`
		display: none;
	`};
`;

const CollectionsDesktop = styled.div`
	${mq.mdDown`
	display: none;
`}

	position: relative;
	position: sticky;
	top: ${dim()};
	align-self: start;

	&:before {
		content: "";
		position: absolute;
		height: 100%;
		width: 1px;
		background: ${color.lightgrey};
		top: 0;
		left: ${dim(-2)};
	}
`;

const PageContentSection = styled(Section)`
	${mq.mdUp`
		display: grid;
		grid-template-columns: 60% 40%;
		grid-column-gap: ${dim(4)};
	`}
`;

const MobileCollections = styled(Section)`
	position: sticky;
	top: 0;
	background: white;
	z-index: 1;

	${mq.mdUp`
		display: none;
	`}
`;

const Features = ({ data }) => {
	const router = useRouter();

	const isIndex = !router.query.slug;

	const category = !isIndex && data.category.items[0];

	const title = isIndex
		? `Features - All - DotWatcher.cc`
		: category.name
		? `Features - ${category.name} - DotWatcher.cc`
		: `Features - DotWatcher.cc`;

	const description = isIndex
		? `Features - All - DotWatcher.cc`
		: category.shortDescription
		? category.shortDescription
		: `Features - ${category.name} - DotWatcher.cc`;

	const features = isIndex
		? data.featureCollection.items
		: category.linkedFrom.featureCollection.items;

	const CollectionsList = ({ items = [] }) => (
		<Fragment>
			{items.length > 0 &&
				items.map((collection, ind) => {
					return (
						<Fragment key={ind}>
							<Link href={collection.slug}>
								<a>
									<H3>{collection.name}</H3>
								</a>
							</Link>

							<p>{collection.shortDescription}</p>
						</Fragment>
					);
				})}
			<Link href="/features">
				<a>
					<H3>View all</H3>
				</a>
			</Link>
		</Fragment>
	);

	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta property="og:title" content={title} />

				<meta property="og:description" content={description} />

				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<div>
				<Section>
					<Center>
						<H1>{category ? category.name : "Our Features"}</H1>

						{category && (
							<p>{documentToReactComponents(category.description.json)}</p>
						)}
					</Center>
				</Section>

				{data.featureCategoryCollection.items.length > 0 && (
					<MobileCollections>
						<Center>
							<H2>Discover More</H2>
						</Center>

						<CollectionsFlex>
							<CollectionsList items={data.featureCategoryCollection.items} />
						</CollectionsFlex>
					</MobileCollections>
				)}

				<PageContentSection>
					<div>
						{features.map((feature, ind) => {
							return (
								<Feature key={ind}>
									{feature.featuredImage && (
										<FeatureImage>
											<Link href={`/feature/${feature.slug}`} passHref>
												<a>
													<Image
														src={
															feature.featuredImage.url +
															"?w=400&h=266&fit=fill"
														}
														width={400}
														height={266}
													/>
												</a>
											</Link>
										</FeatureImage>
									)}
									<FeatureContent>
										<h3>
											<Link href={`/feature/${feature.slug}`} passHref>
												<a>{feature.title}</a>
											</Link>
										</h3>

										<P>{feature.excerpt}</P>

										{feature.contributor && (
											<p>
												<Link
													href={`/contributor/${feature.contributor.slug}`}
													passHref
												>
													<a>By: {feature.contributor.name}</a>
												</Link>
											</p>
										)}
									</FeatureContent>
								</Feature>
							);
						})}
					</div>

					<CollectionsDesktop>
						<H2>Discover More</H2>
						<CollectionsList items={data.featureCategoryCollection.items} />
					</CollectionsDesktop>
				</PageContentSection>

				{data.featureCategoryCollection.items.length > 0 && (
					<MobileCollections>
						<Center>
							<H2>Discover More</H2>
						</Center>

						<CollectionsFlex>
							<CollectionsList items={data.featureCategoryCollection.items} />
						</CollectionsFlex>
					</MobileCollections>
				)}
			</div>
		</Fragment>
	);
};

const getQuery = context => {
	const slug = context.query.slug && context.query.slug[0];

	const feature = `
		title
		excerpt
		slug
		contributor {
			name
			slug
		}
		featuredImage {
			url
		}
	`;

	if (slug) {
		return {
			variables: {
				slug
			},
			query: gql`
				query getFeatures($slug: String){
					featureCategoryCollection(limit: 10, preview: true) {
						items {
							name
							slug
							shortDescription
							description {
								json
							}
						}
					}

					category: featureCategoryCollection(
						preview: true
						limit: 1
						order: sys_firstPublishedAt_DESC
						where: { slug: $slug }
					) {
						items {
							slug
							name
							description {
								json
							}
							shortDescription
							linkedFrom {
								featureCollection(limit: 50) {
									items {
										${feature}
									}
								}
							}
						}
					}
				}
			`
		};
	}

	return {
		query: gql`
			{
				featureCollection(limit: 50, order: sys_firstPublishedAt_DESC, preview: true) {
					items {
						${feature}
					}
				}
				featureCategoryCollection(limit: 10, preview: true) {
					items {
						name
						slug
						shortDescription
						description {
							json
						}
					}
				}
			}
		`
	};
};

export const getServerSideProps = async context => {
	try {
		const { data } = await client.query(getQuery(context));

		if (data.featureCollection && data.featureCollection.items.length < 1) {
			return {
				notFound: true
			};
		}

		return { props: { data } };
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
};

export default Features;
