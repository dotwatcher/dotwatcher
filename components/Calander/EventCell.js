import compose from "recompose/compose";
import withProps from "recompose/withProps";
import withStateHandlers from "recompose/withStateHandlers";
import format from "date-fns/format";
import { updateQueryStringfromFilters } from "../../utils/calander";
import Link from "next/link";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const A = styled.a`
	${tachyons}
`;

const enhance = compose(
	withProps(({ start, end, membershipStatus }) => ({
		startFormatted: format(start, "h:mma"),
		endFormatted: format(end, "h:mma")
	})),
	withStateHandlers(
		{ modalOpen: false },
		{
			toggleModal: ({ modalOpen }, { id, isRCCCalendar, isMember }) => () => {
				if (isRCCCalendar && !isMember) {
					return;
				}
				updateQueryStringfromFilters({ "event-id": id });
				return { modalOpen: !modalOpen };
			}
		}
	)
);

const EventCell = ({ startFormatted, endFormatted, toggleModal, data }) => {
	const hoverClass = "";

	const {
		title,
		slug,
		description,
		raceID,
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
		<div class="event-cell" onClick={toggleModal}>
			<Link passHref {...LinkProps}>
				<A dib f6 f5_l mt2 mb0 no_underline>
					<p class={`t-body event-cell__title ${hoverClass}`}>
						{title} - {location}
					</p>
					<p class={`t-body t-em event-cell__times ${hoverClass}`}>
						{startFormatted} - {endFormatted}
					</p>
				</A>
			</Link>
		</div>
	);
};

export default enhance(EventCell);
