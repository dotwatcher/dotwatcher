import format from "date-fns/format";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const Wrapper = styled.div`
	text-align: center;
	padding-bottom: var(--spacing-large);
	padding-top: var(--spacing-large);
	border-bottom: 1px solid black;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 48em) {
		margin-top: var(--spacing-medium);
		margin-bottom: var(--spacing-medium);
		padding-bottom: var(--spacing-small);
		padding-top: var(--spacing-medium);
		justify-content: space-between;
		border-bottom: none;
	}
`;

const Placeholder = styled.div`
	min-height: 100%;
	text-align: center;
	margin: 0 var(--spacing-medium);
`;

const CalenderChange = styled.button`
	${tachyons}
	text-decoration: underline;
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
	const month = format(currentDate, "MMM");
	const year = format(currentDate, "YYYY");

	return (
		<Wrapper>
			<Placeholder>
				<CalenderChange near_black hover_blue onClick={handlePrevMonthClick}>
					Prev
				</CalenderChange>
			</Placeholder>

			<YearWrapper>
				<MonthTitle f3 f2_ns fw6 ma0 mb3 lh_title>
					{month}
				</MonthTitle>
				<span>{year}</span>
			</YearWrapper>

			<Placeholder>
				<CalenderChange near_black hover_blue onClick={handleNextMonthClick}>
					Next
				</CalenderChange>
			</Placeholder>
		</Wrapper>
	);
};

export default MonthNav;
