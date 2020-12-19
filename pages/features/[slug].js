import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { compose } from "recompose";

import Header from "../../components/header";
import { P } from "../../components/UI/Tachyons";
import Page from "../../components/shared/page";
import Footer from "../../components/footer";
import FeaturePreview from "../../components/feature-preview";
import { withFeatureCategories } from "../../data/with-feature-categories";
import NothingFound from "../../components/NothingFound";
import CategoriesList from "../../components/Features/CategoriesList";
import { WithFeatures } from "../../data/with-features";

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;

const Features = props => {
	const [category] = props.data.category.items;

	console.log(props);

	const router = useRouter();

	if (!category) {
		return (
			<NothingFound user={props.user}>
				<P>There are no features matching {router.query.slug}</P>
			</NothingFound>
		);
	}

	const title = category.fields.name
		? `Features - ${category.fields.name} - DotWatcher.cc`
		: `Features - DotWatcher.cc`;

	const description = category.fields.shortDescription
		? category.fields.shortDescription
		: `Features - ${category.fields.name} - DotWatcher.cc`;

	return (
		<Page>
			<Head>
				<title>{title}</title>
				<meta property="og:title" content={title} />

				<meta property="og:description" content={description} />

				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<Header user={props.user} title="dotwatcher.cc" />

			<Div mt3 mt4_l mh6_l>
				<Div pb5>
					<Heading w_100 mb4 ph3>
						<H1 f4 fw6 ttu tracked bb bw1 b__light_gray pb1>
							{category.fields.name}
						</H1>

						<p>{documentToReactComponents(category.fields.description)}</p>
					</Heading>

					<CategoriesList categories={props.categories} />

					{props.data.entries.items.map(feature => (
						<FeaturePreview
							data={feature.fields}
							id={feature.sys.id}
							key={feature.sys.id}
						/>
					))}

					<CategoriesList categories={props.categories} />
				</Div>
			</Div>
			<Footer />
		</Page>
	);
};

Features.propTypes = {
	features: PropTypes.array
};

Features.defaultProps = {
	data: {},
	user: {}
};

const enhance = compose(withFeatureCategories, WithFeatures);

const Feature = enhance(Features);

export default Feature;
