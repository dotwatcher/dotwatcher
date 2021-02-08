import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dim from "@Utils/dim";
import Link from "next/link";
import { Fragment } from "react";
import H1 from "@Components/UI/H1";
import H2 from "@Components/UI/H2";
import H4 from "@Components/UI/H4";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import colors from "@Utils/colors";
import mq from "@Utils/media-query";

const Collections = styled.div`
	column-count: 2;

	${mq.mdUp`
		column-count: unset;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		margin-top: unset;
	`}
`;

const FeatureCategories = ({ featureCategoryCollection }) => (
	<Center>
		<H2>Browse our features</H2>
		{featureCategoryCollection.items.length > 0 ? (
			<Collections>
				{featureCategoryCollection.items.map((collection, ind) => (
					<P>
						<Link href={`features/${collection.slug}`} passHref key={ind}>
							<A>{collection.name}</A>
						</Link>
					</P>
				))}

				<P>
					<Link href="/features" passHref>
						<A>View all</A>
					</Link>
				</P>
			</Collections>
		) : (
			<P>
				<Link href="/features" passHref>
					<A>View all</A>
				</Link>
			</P>
		)}
	</Center>
);

export default FeatureCategories;
