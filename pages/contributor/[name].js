"use strict";

import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import { WithContributor } from "../../data/with-contributor";
import Header from "../../components/header";
import Page from "../../components/shared/page";
import Footer from "../../components/footer";
import Richtext from "../../components/rich-text";
import InstagramLogo from "../../components/shared/icons/instagram";
import TwitterLogo from "../../components/shared/icons/twitter";
import StravaLogo from "../../components/shared/icons/strava";
import Contribute from "../../components/contributor-info/contribute";

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;
const Contributor = styled.div`
	@media screen and (min-width: 48em) {
		display: grid;
		grid-template-columns: [sidebar] 1fr [content] 3fr;
		grid-gap: 0 4rem;
	}
	${tachyons}
`;
const Figure = styled.figure`
	${tachyons}
`;
const Img = styled.img`
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
const Profile = styled.div`
	grid-column: content;
	${tachyons}
`;

const ContributorPage = ({ contributor, user }) => (
	<Page>
		<Head>
			<title>{contributor.name}’s contributor profile - DotWatcher.cc</title>
			<meta
				property="og:title"
				content={`${contributor.name}’s contributor profile - DotWatcher.cc`}
			/>
			<meta
				property="og:image"
				content={`${contributor.avatar.url}?w=600&h=600&fm=jpg&q=80`}
			/>
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@dotwatcher" />
			<meta name="twitter:creator" content="@dotwatcher" />
			<meta
				name="twitter:title"
				content={`${contributor.name}’s contributor profile - DotWatcher.cc`}
			/>
			<meta
				name="twitter:image"
				content={`${contributor.avatar.url}?w=600&h=600&fm=jpg&q=80`}
			/>
			<meta
				name="description"
				content={`${contributor.name}’s contributor profile`}
			/>
		</Head>
		<Header user={user} title="dotwatcher.cc" />
		<Div mt3 mh3 mh6_l>
			<Contributor mt4 pb5 className="cf">
				<Sidebar tc_ns w_50 w_100_ns>
					<Figure ma0 mb3>
						<Img
							img
							db
							bg_light_gray
							br_100
							title={contributor.avatar.title}
							alt={contributor.avatar.description}
							src={`${contributor.avatar.url}?w=500&h=500&fit=fill&fm=jpg&q=60`}
							srcSet={`${contributor.avatar.url}?w=500&h=500&fit=fill&fm=jpg&q=60 768w, ${contributor.avatar.url}?w=600&h=600&fit=fill&fm=jpg&q=80 1024w`}
							sizes="200vw"
						/>
					</Figure>
					{contributor.website && (
						<A
							near_black
							link
							hover_blue
							mb3
							tl
							tc_ns
							fw6
							db
							href={contributor.website}
						>
							{contributor.website.replace(/^(http|https):\/\//, "")}
						</A>
					)}
					{contributor.instagramProfile && (
						<A
							w2
							mr3
							mh3_ns
							near_black
							link
							hover_blue
							dib
							v_btm
							href={contributor.instagramProfile}
							title={`Follow ${contributor.name} on Instagram`}
						>
							<InstagramLogo />
						</A>
					)}
					{contributor.twitterProfile && (
						<A
							w2
							mh3
							near_black
							link
							hover_blue
							dib
							v_btm
							href={contributor.twitterProfile}
							title={`Follow ${contributor.name} on Twitter`}
						>
							<TwitterLogo />
						</A>
					)}
					{contributor.stravaProfile && (
						<A
							w2
							mh3
							near_black
							link
							hover_blue
							dib
							v_btm
							href={contributor.stravaProfile}
							title={`Follow ${contributor.name} on Strava`}
						>
							<StravaLogo />
						</A>
					)}
				</Sidebar>
				<Profile>
					<Heading mb3>
						<H1 f3 f1_l fw6 lh_solid ma0>
							{contributor.name}
						</H1>
					</Heading>
					<Richtext source={contributor.bio} />
					<Contribute />
				</Profile>
			</Contributor>
		</Div>
		<Footer />
	</Page>
);

ContributorPage.propTypes = {
	contributor: PropTypes.object
};

ContributorPage.defaultProps = {
	contributor: {
		name: "Not found"
	}
};

export default WithContributor(ContributorPage);
