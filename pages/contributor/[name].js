"use strict";

import React, { Component, Fragment } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import InstagramLogo from "@Components/UI/Icons/instagram";
import TwitterLogo from "@Components/UI/Icons/twitter";
import StravaLogo from "@Components/UI/Icons/strava";

import Section from "@Components/UI/Section";
import Center from "@Components/UI/Center";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H4 from "@Components/UI/H4";
import P from "@Components/UI/P";
import { gql } from "@apollo/client";
import client from "@Utils/apollo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Link from "next/link";
import moment from "moment";

const A = styled.a`
	${tachyons}
`;

const Sidebar = styled.div`
	grid-column: sidebar;
	float: left;
	margin: 0 var(--spacing-large) var(--spacing-small) 0;
	@media screen and (min-width: 48em) {
		float: none;
		margin: 0;
	}
	${tachyons}
`;

//////////
const Avatar = styled.div`
	border-radius: 100%;
	margin: 0 auto;
	max-width: 200px;

	img {
		border-radius: 100%;
	}
`;

const MaxCenter = styled(Center)`
	max-width: 1200px;
	margin: 0 auto;
`;

const Icon = styled.a`
	display: inline-block;
	width: 35px;

	margin: 0 ${dim()};
`;

const Features = styled.div`
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: ${dim(2)};
	grid-row-gap: ${dim(2)};
	display: grid;

	${mq.mdUp`
		grid-template-columns: repeat(4, 1fr);
	`}
`;
const ContributorPage = ({ data }) => {
	const [contributor] = data.contributorCollection.items;

	return (
		<Fragment>
			<Head>
				<title>{contributor.name}’s contributor profile - DotWatcher.cc</title>
				<meta
					property="og:title"
					content={`${contributor.name}’s contributor profile - DotWatcher.cc`}
				/>
				{contributor.avatar && (
					<meta
						property="og:image"
						content={`${contributor.avatar.url}?w=600&h=600&fm=jpg&q=80`}
					/>
				)}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content={`${contributor.name}’s contributor profile - DotWatcher.cc`}
				/>
				{contributor.avatar && (
					<meta
						name="twitter:image"
						content={`${contributor.avatar.url}?w=600&h=600&fm=jpg&q=80`}
					/>
				)}
				<meta
					name="description"
					content={`${contributor.name}’s contributor profile`}
				/>
			</Head>

			<Section>
				<Center>
					<H1>{contributor.name}</H1>
				</Center>

				{contributor.avatar.url && (
					<Avatar>
						<Image
							width={500}
							height={500}
							title={contributor.name}
							aly={contributor.name}
							src={`${contributor.avatar.url}?w=500&h=500&fit=fill&fm=jpg&q=60`}
						/>
					</Avatar>
				)}
			</Section>

			<Section>
				<Center>
					{contributor.website && (
						<A target="_bkank" href={contributor.website}>
							{contributor.website.replace(/^(http|https):\/\//, "")}
						</A>
					)}
					{contributor.instagramProfile && (
						<Icon
							target="_blank"
							href={contributor.instagramProfile}
							title={`Follow ${contributor.name} on Instagram`}
						>
							<InstagramLogo />
						</Icon>
					)}
					{contributor.twitterProfile && (
						<Icon
							target="_blank"
							href={contributor.twitterProfile}
							title={`Follow ${contributor.name} on Twitter`}
						>
							<TwitterLogo />
						</Icon>
					)}
					{contributor.stravaProfile && (
						<Icon
							target="_blank"
							href={contributor.stravaProfile}
							title={`Follow ${contributor.name} on Strava`}
						>
							<StravaLogo />
						</Icon>
					)}
				</Center>
			</Section>

			<Section>
				<MaxCenter>{documentToReactComponents(contributor.bio.json)}</MaxCenter>
			</Section>

			{data.featureCollection.items.length > 0 && (
				<Section>
					<Center>
						<H2>Written by {contributor.name}</H2>
					</Center>

					<Features>
						{data.featureCollection.items.map((feature, ind) => (
							<div key={ind}>
								<Link href={`/feature/${feature.slug}`} passHref>
									<a>
										<H4>{feature.title}</H4>
									</a>
								</Link>

								<Link href={`/feature/${feature.slug}`} passHref>
									<a>
										<Image
											src={feature.featuredImage.url + "?w=600&h=400&fit=fill"}
											width={600}
											height={400}
										/>
									</a>
								</Link>

								<P>{feature.excerpt}</P>

								<P>
									{moment(feature.sys.firstPublishedAt).format("MMM Do YYYY")}
								</P>
							</div>
						))}
					</Features>
				</Section>
			)}

			<Section>
				<MaxCenter>
					<H2>Become a DotWatcher contributor</H2>
					<P>
						Do you have stories, photos, or insight that would be at home on
						DotWatcher? Drop us a line at{" "}
						<a href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</a>, or find
						us on{" "}
						<a href="https://twitter.com/dotwatcher" target="_blank">
							Twitter
						</a>{" "}
						and{" "}
						<a href="https://www.instagram.com/dotwatcher.cc/" target="_blank">
							Instagram
						</a>
						.
					</P>
				</MaxCenter>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async ctx => {
	try {
		const { data } = await client.query({
			variables: {
				name: ctx.query.name
			},
			query: gql`
				query getContributor($name: String!) {
					contributorCollection(limit: 1, where: { slug: $name }) {
						items {
							website
							instagramProfile
							twitterProfile
							stravaProfile
							name
							bio {
								json
							}
							avatar {
								url
							}
						}
					}

					featureCollection(
						limit: 8
						order: [sys_firstPublishedAt_DESC]
						where: { contributor: { slug: $name } }
					) {
						items {
							sys {
								firstPublishedAt
							}
							title
							slug
							excerpt
							featuredImage {
								url
								title
							}
						}
					}
				}
			`
		});

		if (data.contributorCollection.items.length < 1) return { notFound: true };

		return { props: { data } };
	} catch (error) {
		console.log(error);

		return {
			notFound: true
		};
	}
};

export default ContributorPage;
