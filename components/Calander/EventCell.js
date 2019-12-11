import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import moment from "moment";
import isSameDay from "date-fns/is_same_day";

const A = styled.a`
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
	transition: visibility ease-in-out 0.3s;
	position: absolute;
	top: -30px;
	left: -15px;
	background: white;
	border: 1px solid grey;
	padding: 10px;
	box-shadow: 0px 0px 5px 0px black;

	width: 100%;

	@media screen and (min-width: 48em) {
		width: 220px;
	}
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

	const LinkProps = {
		href: calendarOnly ? website : `/race?slug=${slug}`,
		as: calendarOnly ? null : `/race/${slug}`,
		target: calendarOnly ? "_blank" : "_self"
	};

	return (
		<EventCell
			eventColor={eventColor}
			onClick={toggleModal}
			onMouseEnter={() => setshowDetails(true)}
			onMouseLeave={() => setshowDetails(false)}
			onTouchStart={() => setshowDetails(true)}
		>
			<Link passHref {...LinkProps}>
				<A black hover_near_black underline_hover dib f6 f5_l no_underline>
					{isSameDay(raceDate, calendarDate) && title}
				</A>
			</Link>

			<EventDetails visible={showDetails}>
				<Link passHref {...LinkProps}>
					<A
						black
						hover_near_black
						underline_hover
						dib
						f6
						f5_l
						mt2
						mb0
						no_underline
					>
						<p>
							{title} - {location}
						</p>
					</A>
				</Link>
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
