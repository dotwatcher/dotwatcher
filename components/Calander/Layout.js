import compose from "recompose/compose";
import mapProps from "recompose/mapProps";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import eachDay from "date-fns/each_day";
import setDay from "date-fns/set_day";
import startOfDay from "date-fns/start_of_day";
import isSameMonth from "date-fns/is_same_month";
import isToday from "date-fns/is_today";
import { DateTime } from "luxon";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";

import styled from "styled-components";

import DateCell, { Cell } from "./DateCell";
import moment from "moment";

const CalendarLayout = styled.article`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: 1fr;

	${Cell} {
		border-bottom: 1px solid black;
		border-left: 1px solid black;
		padding: var(--spacing-small);
	}
`;

const daysOfMonth = date => {
	const currentDate = date;

	const startMonth = startOfMonth(date);
	const endMonth = endOfMonth(date);

	const startCalMonth = startOfWeek(startMonth, { weekStartsOn: 1 });
	const endCalMonth = endOfWeek(endMonth, { weekStartsOn: 1 });

	const dayArray = eachDay(startCalMonth, endCalMonth);

	return dayArray.map(date => ({
		date: date,
		isCurrentMonth: isSameMonth(currentDate, date),
		isToday: isToday(date),
		events: []
	}));
};

// Only needed until date-fns release timezone support
const removeTimeZoneFromDate = date => {
	const parsedDate = DateTime.fromISO(date, { setZone: true });
	return DateTime.local(
		parsedDate.year,
		parsedDate.month,
		parsedDate.day,
		parsedDate.hour,
		parsedDate.minute
	).toJSDate();
};

const daysAndEvents = (events = [], currentDate) => {
	const monthDays = daysOfMonth(currentDate);

	const tzFreeEvents = events.map(e => ({
		...e,
		start: removeTimeZoneFromDate(e.data.raceDate),
		end: removeTimeZoneFromDate(e.data.raceEndDate)
	}));

	const datedEvents = groupBy(tzFreeEvents, e => startOfDay(e.data.raceDate));

	return monthDays.map(d => {
		return {
			...d,
			events: sortBy(datedEvents[d.date.toString()], ["start"]) || []
		};
	});
};

const Layout = ({ events = [], ...props }) => {
	const _events = daysAndEvents(events, Date.now());

	return (
		<CalendarLayout>
			{_events.map(d => (
				<DateCell {...d} />
			))}
		</CalendarLayout>
	);
};

export default Layout;
// export default enhance(Layout);
