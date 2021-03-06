import Link from "next/link";
import { Fragment } from "react";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import moment from "moment";
import Image from "next/image";
import { Grid, GridItem } from "./grid";

const Features = ({ featureCollection }) => (
	<Fragment>
		<Center>
			<H2>Recently on DotWatcher</H2>
		</Center>
		<Grid>
			{featureCollection.items.slice(0, 4).map((feature, ind) => (
				<GridItem key={ind}>
					{feature.featuredImage && (
						<Link href={`/feature/${feature.slug}`} passHref>
							<a>
								<Image
									src={feature.featuredImage.url + "?w=600&h=400&fit=fill"}
									alt={feature.title}
									title={feature.title}
									width={600}
									height={400}
								/>
							</a>
						</Link>
					)}

					<Link href={`/feature/${feature.slug}`} passHref>
						<A title={feature.title}>
							<H3>{feature.title}</H3>
						</A>
					</Link>

					<P>{feature.excerpt}</P>

					{feature.contributor && (
						<Link href={`/contributor/${feature.contributor.slug}`} passHref>
							<P>
								<A title={feature.contributor.name}>
									By: {feature.contributor.name}
								</A>
							</P>
						</Link>
					)}

					{feature.sys.firstPublishedAt && (
						<p>{moment(feature.sys.firstPublishedAt).format("MMM Do YYYY")}</p>
					)}
				</GridItem>
			))}
		</Grid>
	</Fragment>
);

export default Features;
