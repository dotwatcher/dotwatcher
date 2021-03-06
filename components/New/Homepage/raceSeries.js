import Link from "next/link";
import { Fragment } from "react";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import styled from "styled-components";
import Image from "next/image";
import Carousel from "@Components/New/Carousel";
import RichText from "@Components/New/RichText";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import colors from "@Utils/colors";

const Slide = styled.div`
	position: relative;
	color: white;
`;

const SlideLink = styled(A)`
	color: white !important;
`;
const Content = styled.article`
	position: absolute;
	bottom: ${dim()};
	left: ${dim()};

	${mq.mdUp`
		max-width: 50%;
	`}
`;

const SlideDescription = styled.div`
	background: #00000063; // opacity on black
	padding: 10px;

	* {
		color: white;
	}

	a:hover {
		color: ${colors.lightgrey};
	}
`;

const RaceSeries = ({ favouriteRacesCollection }) => (
	<Fragment>
		<Center>
			<H3>Our Favourite Race Series</H3>
		</Center>

		<Carousel>
			{favouriteRacesCollection.items.map((race, ind) => (
				<Slide key={ind}>
					<Image
						src={race.heroImage.url + "?w=1600&h=900&fit=fill"}
						width={1600}
						height={900}
					/>

					<Content>
						<Link href={`/series/${race.race}`} passHref>
							<SlideLink>
								<SlideDescription>
									<H2 key={ind}>{race.name}</H2>

									{race.description && (
										<RichText source={race.description.json} />
									)}
								</SlideDescription>
							</SlideLink>
						</Link>
					</Content>
				</Slide>
			))}
		</Carousel>
	</Fragment>
);

export default RaceSeries;
