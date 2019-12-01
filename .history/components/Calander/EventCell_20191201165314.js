import { h } from "preact";
import { connect } from "unistore/preact";
import compose from "recompose/compose";
import withProps from "recompose/withProps";
import withStateHandlers from "recompose/withStateHandlers";
import lifecycle from "recompose/lifecycle";
import format from "date-fns/format";
import {
	updateQueryStringfromFilters,
	handleModalOpenWithID
} from "../../utils";
import { isMember } from "../../utils/calander";

import EventModal from "../EventModal";

const mapStateToProps = ["isRCCCalendar", "membershipStatus"];

const enhance = compose(
	connect(mapStateToProps),
	withProps(({ start, end, membershipStatus }) => ({
		startFormatted: format(start, "h:mma"),
		endFormatted: format(end, "h:mma"),
		isMember: isMember({ membershipStatus })
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

const EventCell = ({
	start,
	startFormatted,
	endFormatted,
	title,
	description,
	location,
	toggleModal,
	modalOpen,
	isMember,
	isRCCCalendar
}) => {
	const disableHoverState = !isMember && isRCCCalendar;
	const hoverClass = disableHoverState ? "no-cursor" : "";

	return (
		<div class="event-cell" onClick={toggleModal}>
			<p class={`t-body event-cell__title ${hoverClass}`}>{title}</p>
			<p class={`t-body t-em event-cell__times ${hoverClass}`}>
				{startFormatted} - {endFormatted}
			</p>

			<EventModal
				open={modalOpen}
				title={title}
				description={description}
				location={location}
				start={start}
				startFormatted={startFormatted}
				endFormatted={endFormatted}
				toggleModal={toggleModal}
			/>
		</div>
	);
};

export default enhance(EventCell);
