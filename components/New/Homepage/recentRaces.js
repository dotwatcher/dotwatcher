import { Fragment } from "react";
import Link from "next/link";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import moment from "moment";
import { Grid, GridItem } from "./grid";
import Image from "next/image";

const RecentRaces = ({ racesCollection }) => (
	<Fragment>
		<Center>
			<H2>Recent Races</H2>
		</Center>
		<Grid>
			{racesCollection.items.slice(0, 4).map((race, ind) => (
				<GridItem key={ind}>
					<Link href={`/race/${race.slug}`} passHref>
						<a>
							<Image
								src={race.icon.url + "?w=600&h=400&fit=fill"}
								width={600}
								height={400}
								alt={race.title}
								title={race.title}
							/>
						</a>
					</Link>

					<Link href={`/race/${race.slug}`} passHref>
						<A>
							<H3>{race.title}</H3>
						</A>
					</Link>

					<P>{race.shortDescription}</P>

					<p>{moment(race.raceDate).format("MMM Do YYYY")}</p>
				</GridItem>
			))}
		</Grid>
	</Fragment>
);

export default RecentRaces;
