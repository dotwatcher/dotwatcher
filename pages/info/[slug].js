import React, { Fragment } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import { Div, H1 } from "../../components/UI/Tachyons";

const Info = ({ data }) => {
	const [page] = data.infoPageCollection.items;
	return (
		<Fragment>
			<Head>
				<title>{page.title} – DotWatcher.cc</title>
				<meta property="og:title" content={`${page.title} – DotWatcher.cc`} />
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
				<meta name="twitter:title" content={`${page.title} – DotWatcher.cc`} />
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

			<Div mt3 mt4_l mh6_l>
				<H1>{page.title}</H1>
				{documentToReactComponents(page.content.json)}
			</Div>
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
				query getInfoPage($slug: String) {
					infoPageCollection(where: { slug: $slug }) {
						items {
							title
							content {
								json
							}
						}
					}
				}
			`
		});

		if (data.infoPageCollection.items.lenght < 1) {
			return {
				notFound: true
			};
		}

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

export default Info;
