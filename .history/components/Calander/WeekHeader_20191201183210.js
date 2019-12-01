import eachDay from "date-fns/each_day";
import format from "date-fns/format";

const weekDayNames = () => {
	// Months are 0 indexed so 11 is Dec
	const startOfWeek = new Date(2017, 11, 4);
	const endOfWeek = new Date(2017, 11, 10);

	const weekArr = eachDay(startOfWeek, endOfWeek);
	return weekArr.map(d => format(d, "ddd"));
};

const WeekDayCell = ({ name }) => (
	<span class="t-h4 week-header__day">{name}</span>
);

const WeekHeader = () => (
	<div class="calendar__week-header">
		{weekDayNames().map(d => (
			<WeekDayCell name={d} />
		))}
	</div>
);

export default WeekHeader;
