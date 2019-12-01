import compose from "recompose/compose";
import withProps from "recompose/withProps";
import format from "date-fns/format";
import cn from "classnames";

import EventCell from "./EventCell";

const DateCell = ({ isCurrentMonth, events, isToday }) => {
	const noEvents = events.length === 0;
	const dayOfWeek = format(date, "ddd");
	const dateNo = format(data, "D");
	return (
		<div
			class={cn("date-cell", {
				"date-cell--off-range": !isCurrentMonth,
				"date-cell--today": isToday,
				"date-cell--no-events": noEvents
			})}
		>
			<div class="date-cell__no">
				<span class="date-cell__dow t-h4">{dayOfWeek}</span>
				<span class="t-h1 t-editorial-r">{dateNo}</span>
			</div>

			<div class="event-cells">
				{events.map(e => (
					<EventCell {...e} />
				))}
			</div>
		</div>
	);
};

export default DateCell;
