import format from "date-fns/format";
import cn from "classnames";
import styled from "styled-components";

import EventCell from "./EventCell";

export const Cell = styled.div``;

const DateCell = ({ isCurrentMonth, events = [], isToday, date = "" }) => {
	const noEvents = events.length === 0;
	const dayOfWeek = format(date, "ddd");
	const dateNo = format(date, "D");

	return (
		<Cell isCurrentMonth={isCurrentMonth} isToday={isToday} noEvents={noEvents}>
			<div class="date-cell__no">
				<span class="date-cell__dow t-h4">{dayOfWeek}</span>
				<span class="t-h1 t-editorial-r">{dateNo}</span>
			</div>

			<div class="event-cells">
				{events.map(e => (
					<EventCell {...e} />
				))}
			</div>
		</Cell>
	);
};

export default DateCell;
