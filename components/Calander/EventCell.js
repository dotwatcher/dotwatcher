import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import moment from "moment";
import isSameDay from "date-fns/is_same_day";

const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const EventCell = styled.div`
	position: relative;
	background-color: ${({ eventColor }) => eventColor};
	padding: 5px;
	border-radius: 4px;
	min-height: 29px;

	& + & {
		margin-top: var(--spacing-small);
	}
`;

const EventDetails = styled.div`
	visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
	background-color: white;
	position: absolute;
	top: -30px;
	left: -20px;
	background: white;
	border: 1px solid var(--gray);
	padding: 10px;
	z-index: 1;

	width: 100%;

	@media screen and (min-width: 48em) {
		width: 220px;
	}
`;

const EventColor = styled.span`
	display: inline-block;
	width: 100%;
	height: 10px;
	background-color: ${({ eventColor }) => eventColor};
	border-radius: 10px;
`;

const Event = ({
	startFormatted,
	endFormatted,
	toggleModal,
	data,
	eventColor,
	calendarDate
}) => {
	const [showDetails, setshowDetails] = useState(false);

	const {
		title,
		slug,
		description,
		raceID,
		raceDate,
		raceEndDate,
		terrain,
		website,
		location,
		length,
		calendarOnly
	} = data;

	const Anchor = ({ children, ...props }) =>
		calendarOnly ? (
			<A target="_blank" href={website} {...props}>
				{children}
			</A>
		) : (
			<Link passHref href={`/race?slug=${slug}`} as={`/race/${slug}`}>
				<A {...props}>{isSameDay(raceDate, calendarDate) && title}</A>
			</Link>
		);

	return (
		<EventCell
			eventColor={eventColor}
			onClick={toggleModal}
			onMouseEnter={() => setshowDetails(true)}
			onMouseLeave={() => setshowDetails(false)}
			onTouchStart={() => setshowDetails(true)}
		>
			<Anchor white hover_near_black underline_hover dib f6 f5_l no_underline>
				{isSameDay(raceDate, calendarDate) && title}
			</Anchor>

			<EventDetails visible={showDetails} eventColor={eventColor}>
				<EventColor eventColor={eventColor} />

				<Anchor
					black
					hover_near_black
					underline_hover
					dib
					f6
					f5_l
					mt0
					mb0
					no_underline
				>
					<P mt2 mb0>
						{title}
					</P>
				</Anchor>
				<p>
					{moment(raceDate).format("Do MMM")} -{" "}
					{moment(raceEndDate).format("Do MMM")}
				</p>

				<p>Location: {location}</p>

				<p>Terrain: {terrain}</p>

				<p>Distance: {length}</p>
			</EventDetails>
		</EventCell>
	);
};

export default Event;
