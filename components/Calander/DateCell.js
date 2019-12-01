import format from "date-fns/format";
import cn from "classnames";
import styled from "styled-components";
import moment from "moment";

import EventCell from "./EventCell";

export const Cell = styled.div`
	${props => !props.isCurrentMonth && "background-color: var(--light-gray);"}
	${props => props.isToday && "background-color: var(--moon-gray);"}
`;

const DateCell = ({ isCurrentMonth, events = [], date = "" }) => {
	const noEvents = events.length === 0;
	const dayOfWeek = format(date, "ddd");
	const dateNo = format(date, "D");

	const m_today = moment(Date.now());
	const m_date = moment(date);
	const isToday = m_date.startOf("day").isSame(m_today.startOf("day"));

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
