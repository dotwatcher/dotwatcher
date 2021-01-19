import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import mq from "../utils/media-query";

import { useEffect, useState } from "react";
import Image from "next/image";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Section from "@Components/UI/Section";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import dim from "@Utils/dim";

const Div = styled.div`
	${tachyons}
`;

const Buttons = styled(Div)`
	${tachyons}

	a + a {
		margin-left: ${dim(3)};
	}
`;

const Feautre = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
`;

const Grid = styled.section`
	padding: 0 ${dim()};

	${mq.smUp`
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: ${dim(3)};
	`}
`;

const ErrorPage = () => {
	const [features, setfeatures] = useState([]);

	const fetchData = async () => {
		try {
			const { data } = await client.query({
				query: gql`
					{
						featureCollection(limit: 4) {
							items {
								sys {
									firstPublishedAt
								}
								title
								excerpt
								contributor {
									name
									slug
								}
								slug
								featuredImage {
									url
									title
								}
							}
						}
					}
				`
			});

			console.log(data);
			setfeatures(data.featureCollection.items);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<Fragment>
			<Head>
				<title>404 - DotWatcher.cc</title>
				<meta property="og:title" content="404 - DotWatcher.cc" />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<Div ph4 ph6_l>
				<Section>
					<H1>404</H1>

					<H2>Whoops, we've lost your dot!</H2>

					<P>
						It doesn't look like that page exists, maybe something below is what
						you were looking for.
					</P>

					<Buttons>
						<Link href="/" passHref>
							<A>Home</A>
						</Link>

						<Link href="/races" passHref>
							<A>Races</A>
						</Link>

						<Link href="/races" passHref>
							<A>Results</A>
						</Link>

						<Link href="/features" passHref>
							<A>Features</A>
						</Link>
					</Buttons>
				</Section>

				<Section>
					<H2>Our latest features</H2>
					<Grid>
						{features.map((article, ind) => (
							<Feautre key={ind}>
								<H3>
									<Link href={`/feature/${article.slug}`} passHref>
										<a>{article.title}</a>
									</Link>
								</H3>

								{article.featuredImage && (
									<Link href={`/feature/${article.slug}`} passHref>
										<a>
											<Image
												width={600}
												height={400}
												src={
													article.featuredImage.url + "?w=600&h=400&fit=fill"
												}
												title={article.title}
												alt={article.title}
											/>
										</a>
									</Link>
								)}

								<P>{article.excerpt}</P>
							</Feautre>
						))}
					</Grid>
				</Section>
			</Div>
		</Fragment>
	);
};

export default ErrorPage;
