import MonthNav from "./MonthNav";
import WeekHeader from "./WeekHeader";
import Layout from "./Layout";
import styled from "styled-components";

const CalendarWrapper = styled.section`
	padding: 0 var(--spacing-large);
`;

export default ({ events = [], currentDate }) => {
	const handleNextMonthClick = () => {};
	const handlePrevMonthClick = () => {};

	return (
		<CalendarWrapper>
			<MonthNav
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
				currentDate={currentDate}
			/>
			<WeekHeader />

			<Layout events={events} />
		</CalendarWrapper>
	);
};
