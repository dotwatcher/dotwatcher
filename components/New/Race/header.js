import H1 from "@Components/UI/H1";
import H4 from "@Components/UI/H4";
import P from "@Components/UI/P";
import { Fragment } from "react";
import moment from "moment";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Section from "@Components/UI/Section";

const Head = styled(Section)`
	text-align: center;
	max-width: 1000px;
	margin: 0 auto;
`;

const RaceDetails = styled(Section)`
	max-width: 1000px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 50% 50%;

	${mq.mdUp`
		display: flex;
		justify-content: space-around;
	`}
`;

const RaceDetail = styled.div`
	flex-grow: 1;

	& + & {
		padding-left: 0;
		${mq.mdUp`
			padding-left: ${dim(4)};
		`}
	}
`;

const RaceDetailTitle = styled(H4)`
	margin-bottom: ${dim()};
	border-bottom: 1px solid ${colors.lightgrey};
	padding-bottom: ${dim(0.5)};
`;

const Header = ({ race }) => {
	return (
		<Fragment>
			<Head>
				<H1>{race.title}</H1>
				<P>{race.location}</P>
				<P>{race.shortDescription}</P>

				<P>{moment(race.raceDate).format("MMMM Do YYYY, kk mm")}</P>

				{race.whatsAppId && (
					<P>
						<a
							href={`https://chat.whatsapp.com/${race.whatsAppId}`}
							target="_blank"
						>
							Join the conversation on WhatsApp
						</a>
					</P>
				)}
			</Head>

			<RaceDetails>
				{race.riders && (
					<RaceDetail>
						<RaceDetailTitle>Total Racers</RaceDetailTitle>
						<P>{race.riders}</P>
					</RaceDetail>
				)}

				{race.length && (
					<RaceDetail>
						<RaceDetailTitle>Distance / Elevation</RaceDetailTitle>
						<P>
							{race.length} / {race.elevation}
						</P>
					</RaceDetail>
				)}

				{race.terrain && (
					<RaceDetail>
						<RaceDetailTitle>Terrain</RaceDetailTitle>
						<P>{race.terrain}</P>
					</RaceDetail>
				)}

				{race.lastYearsWinner && (
					<RaceDetail>
						<RaceDetailTitle>
							{race.winnerLabel || "Last Years Winner"}
						</RaceDetailTitle>
						<P>{race.lastYearsWinner}</P>
					</RaceDetail>
				)}
			</RaceDetails>
		</Fragment>
	);
};

export default Header;
