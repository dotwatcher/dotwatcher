import eachDay from "date-fns/each_day";
import format from "date-fns/format";
import styled from "styled-components";

const WeekHeader = styled.header`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;
	grid-auto-rows: 100px;
	align-items: center;

	@media screen and (max-width: 48em) {
		display: none;
	}
`;

const weekDayNames = () => {
	// Months are 0 indexed so 11 is Dec
	const startOfWeek = new Date(2017, 11, 4);
	const endOfWeek = new Date(2017, 11, 10);

	const weekArr = eachDay(startOfWeek, endOfWeek);
	return weekArr.map(d => format(d, "ddd"));
};

export default () => (
	<WeekHeader>
		{weekDayNames().map(d => (
			<span>{d}</span>
		))}
	</WeekHeader>
);
