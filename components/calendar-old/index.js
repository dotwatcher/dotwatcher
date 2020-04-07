import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

const CalendarDetails = styled.p`
	& + p {
		border-top-style: solid;
		border-top-width: 1px;
	}
	${tachyons}
`;
const Date = styled.span`
	${tachyons}
`;
const Icon = styled.span`
	display: none;
	${tachyons}
`;
const A = styled.a`
	&:hover span,
	&:focus span {
		display: inline;
	}
	${tachyons}
`;

const RaceCalendar = ({ races }) => {
	return (
		<React.Fragment>
			{races.map((race) => {
				const link = {
					href: race.data.calendarOnly
						? race.data.website
						: `/race?slug=${race.data.slug}`,
					as: race.data.calendarOnly ? null : `/race/${race.data.slug}`,
					target: race.data.calendarOnly ? "_blank" : "_self",
				};
				return (
					<CalendarDetails
						key={race.sys.id}
						ma0
						f6
						pv2
						b__light_gray
						className="cf"
					>
						<Link href={link.href} as={link.as} passHref>
							<A
								link
								near_black
								hover_blue
								underline_hover
								target={link.target}
							>
								{race.data.title}

								{race.data.calendarOnly ? <Icon> ⇲</Icon> : null}

								<Date ml2 fr_l gray>
									{moment(race.data.raceDate).format("ll")}
								</Date>
							</A>
						</Link>
					</CalendarDetails>
				);
			})}
		</React.Fragment>
	);
};

RaceCalendar.propTypes = {
	races: PropTypes.array.isRequired,
};

export default RaceCalendar;
