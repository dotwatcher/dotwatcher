import moment from "moment";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import eachDay from "date-fns/each_day";
import setDay from "date-fns/set_day";
import startOfDay from "date-fns/start_of_day";
import isSameMonth from "date-fns/is_same_month";
import isWithinRange from "date-fns/is_within_range";
import isToday from "date-fns/is_today";
import { DateTime } from "luxon";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";

import styled from "styled-components";

import DateCell from "./DateCell";

const CalendarLayout = styled.article`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-auto-rows: 1fr;
	border: 1px solid black;

	@media screen and (min-width: 48em) {
		grid-template-columns: repeat(7, 1fr);
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
		parsedDate.day
	).toJSDate();
};

const daysAndEvents = (events = [], currentDate) => {
	const monthDays = daysOfMonth(currentDate);

	const tzFreeEvents = events.map(e => ({
		...e,
		start: removeTimeZoneFromDate(e.data.raceDate),
		end: removeTimeZoneFromDate(e.data.raceEndDate)
	}));

	// Remove any time of day so inRange is time unaware
	const formatday = date => date.toDateString();

	return monthDays.map(d => {
		const dayEvents = tzFreeEvents.filter(event => {
			return isWithinRange(
				formatday(d.date),
				formatday(event.start),
				formatday(event.end)
			);
		});

		// Order events of current day in start date order
		const sortedEvents = dayEvents.slice().sort((a, b) => b.start - a.start);

		return {
			...d,
			events: sortedEvents
		};
	});
};

const Layout = ({ events = [], currentDate, ...props }) => {
	const _events = daysAndEvents(events, currentDate);

	return (
		<CalendarLayout>
			{_events.map((d, i) => (
				<DateCell {...d} index={i} />
			))}
		</CalendarLayout>
	);
};

export default Layout;
// export default enhance(Layout);
