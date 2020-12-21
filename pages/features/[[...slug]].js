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
import { WithFeatures } from "../../data/with-features";
import NothingFound from "../../components/NothingFound";
import CategoriesList from "../../components/Features/CategoriesList";

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;

const Categories = styled(Div)`
	grid-column: 10 / span 3;
`;

const Items = styled(Div)`
	grid-column: 1 / span 9;
`;

const Grid = styled(Div)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Features = props => {
	const [category] = props.category.items;

	const router = useRouter();

	const isIndex = !router.query.slug;

	if (!category) {
		return (
			<NothingFound user={props.user}>
				<P>There are no features matching {router.query.slug}</P>
			</NothingFound>
		);
	}

	const title = isIndex
		? `Features - DotWatcher.cc`
		: category.fields.name
		? `Features - ${category.fields.name} - DotWatcher.cc`
		: `Features - DotWatcher.cc`;

	const description = isIndex
		? `Features - DotWatcher.cc`
		: category.fields.shortDescription
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
						<H1 fw6 ttu tracked bb bw1 b__light_gray pb1>
							Features: {isIndex ? "All" : category.fields.name}
						</H1>

						{!isIndex && (
							<p>{documentToReactComponents(category.fields.description)}</p>
						)}
					</Heading>

					<Grid>
						<Items>
							{props.categoryEntries &&
								props.categoryEntries.items &&
								props.categoryEntries.items.map(feature => (
									<FeaturePreview
										data={feature.fields}
										id={feature.sys.id}
										key={feature.sys.id}
									/>
								))}
						</Items>

						<Categories>
							<CategoriesList categories={props.categories} />
						</Categories>
					</Grid>
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
	category: {},
	categoryEntries: [],
	user: {}
};

const enhance = compose(withFeatureCategories, WithFeatures);

export default enhance(Features);
