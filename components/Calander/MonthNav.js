import compose from "recompose/compose";
import format from "date-fns/format";
import differenceInCalendarMonths from "date-fns/difference_in_calendar_months";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const Wrapper = styled.div`
	text-align: center;
	padding-bottom: var(---spacing-large);
	padding-top: var(---spacing-large);
	border-bottom: 1px solid black;
	background-color: transparent;

	@media screen and (max-width: 32em) {
		margin-bottom: var(---spacing-medium);
		padding-bottom: var(---spacing-small);
		padding-top: var(---spacing-medium);
		justify-content: space-between;
		position: sticky;
		top: 0;
		border-bottom: none;
	}
`;

const Placeholder = styled.div`
	display: inline-block;
	width: 30px;
	min-height: 100%;
	text-align: center;
`;

const CalenderChange = styled.div`
	appearance: none;
	-webkit-appearance: none;
	border: none;
	cursor: pointer;
	outline: none;
	background-color: transparent;

	img {
		width: 10px;
	}
`;

const YearWrapper = styled.div`
	margin-bottom: var(--spacing-small);
`;

const MonthTitle = styled.h2`
	${tachyons}
	margin-bottom: var(--spacing-small);
`;

const MonthNav = ({
	handleNextMonthClick,
	handlePrevMonthClick,
	currentDate,
	today
}) => {
	const distanceBetweenMonths = differenceInCalendarMonths(currentDate, today);
	const month = format(currentDate, "MMM");
	const year = format(currentDate, "YYYY");

	return (
		<Wrapper>
			<Placeholder>
				{distanceBetweenMonths > -3 && (
					<CalenderChange onClick={handlePrevMonthClick}>prev</CalenderChange>
				)}
			</Placeholder>

			<YearWrapper>
				<MonthTitle f3 f2_ns fw6 ma0 mb3 lh_title>
					{month}
				</MonthTitle>
				<span>{year}</span>
			</YearWrapper>

			<Placeholder>
				{distanceBetweenMonths < 3 && (
					<CalenderChange onClick={handleNextMonthClick}>next</CalenderChange>
				)}
			</Placeholder>
		</Wrapper>
	);
};

export default MonthNav;
