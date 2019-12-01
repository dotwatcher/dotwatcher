import compose from "recompose/compose";
import withProps from "recompose/withProps";
import withStateHandlers from "recompose/withStateHandlers";
import format from "date-fns/format";
import { updateQueryStringfromFilters } from "../../utils/calander";

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
		length
	} = data;

	return (
		<div class="event-cell" onClick={toggleModal}>
			<p class={`t-body event-cell__title ${hoverClass}`}>
				{title} - {location}
			</p>
			<p class={`t-body t-em event-cell__times ${hoverClass}`}>
				{startFormatted} - {endFormatted}
			</p>
		</div>
	);
};

export default enhance(EventCell);
