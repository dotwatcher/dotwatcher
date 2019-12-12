import MonthNav from "./MonthNav";
import WeekHeader from "./WeekHeader";
import Layout from "./Layout";
import styled from "styled-components";

const CalendarWrapper = styled.section`
	padding: 0 var(--spacing-large);
`;

export default ({
	events = [],
	currentDate,
	setcurrentDate,
	handleNextMonthClick,
	handlePrevMonthClick
}) => {
	return (
		<CalendarWrapper>
			<MonthNav
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
				currentDate={currentDate}
				setcurrentDate={setcurrentDate}
			/>
			<WeekHeader />

			<Layout events={events} currentDate={currentDate} />
		</CalendarWrapper>
	);
};
