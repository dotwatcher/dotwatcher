import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import dim from "@Utils/dim";
import H3 from "@Components/UI/H3";
import H2 from "@Components/UI/H2";
import P from "@Components/UI/P";
import moment from "moment";
import mq from "@Utils/media-query";

const Race = styled.div`
	text-align: center;

	${mq.mdUp`
   text-align: unset;
    display: grid;
    align-items: start;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: ${dim(2)};
  `}
`;

const RaceImage = styled.div`
	grid-column: 1 / span 1;
`;
const RaceExcerpt = styled.div`
	grid-column: 2 / span 4;
`;
const RaceFacts = styled.div`
	grid-column: 6 / span 1;
`;

const Preview = ({ race }) => {
	return (
		<Race>
			<RaceImage>
				<Link href={`/race/${race.slug}`} passHref>
					<a>
						<Image
							src={race.icon.url + "?w=250&h=250&fit=fill"}
							width={250}
							height={250}
						/>
					</a>
				</Link>
			</RaceImage>

			<RaceExcerpt>
				<Link href={`/race/${race.slug}`} passHref>
					<a>
						<H2>{race.title}</H2>
					</a>
				</Link>

				<P>Starts:{moment(race.raceDate).format("MMMM Do YYYY, kk mm")}</P>

				<p>{race.shortDescription}</p>

				<Link href={`/race/${race.slug}`} passHref>
					<a>
						<P>Look back at the race</P>
					</a>
				</Link>
			</RaceExcerpt>

			<RaceFacts>
				<H3>Fact File</H3>
				{race.location && (
					<P>
						<strong>Location</strong>: {race.location}
					</P>
				)}
				{race.length && (
					<P>
						<strong>Length</strong>: {race.length}
					</P>
				)}
				{race.elevation && (
					<P>
						<strong>Elevation</strong>: {race.elevation}
					</P>
				)}
				{race.lastYearsWinnder && (
					<P>
						<strong>Last years winner</strong>: {race.lastYearsWinnder}
					</P>
				)}
				{race.terrain && (
					<P>
						<strong>Terrain</strong>: {race.terrain}
					</P>
				)}
			</RaceFacts>
		</Race>
	);
	return null;
};

export default Preview;
