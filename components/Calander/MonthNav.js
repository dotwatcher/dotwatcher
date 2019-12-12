import format from "date-fns/format";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import isWithinRange from "date-fns/is_within_range";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import getMonth from "date-fns/get_month";

const Button = styled.button`
	${tachyons}
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	text-align: center;
	padding-bottom: var(--spacing-large);
	padding-top: var(--spacing-large);
	border-bottom: 1px solid black;
	background-color: transparent;

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

const MonthNav = styled.div`
	grid-column: 6 / 8;
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 48em) {
		grid-column: 4 / 6;
		justify-content: space-between;
	}
`;

const Today = styled.div`
	grid-column: 1 / 2;

	button {
		cursor: pointer;
	}
`;

const DateFilter = styled.div``;

export default ({
	handleNextMonthClick,
	handlePrevMonthClick,
	currentDate,
	setcurrentDate,
	today
}) => {
	const month = format(currentDate, "MMM");
	const year = format(currentDate, "YYYY");
	const intYear = parseInt(year);
	const intMonth = getMonth(currentDate);

	const [filteredDate, setfilteredDate] = useState({
		month: intMonth,
		year: intYear
	});

	let years = [];
	for (let i = intYear; i > intYear - 5; i--) {
		years.push(i);
	}

	for (let i = intYear; i < intYear + 5; i++) {
		years.push(i);
	}

	years = [...new Set(years)];
	years.sort((a, b) => a - b);

	return (
		<Wrapper>
			<Today>
				{!isWithinRange(
					Date.now(),
					startOfMonth(currentDate),
					endOfMonth(currentDate)
				) && (
					<Button
						f4
						bg_blue
						ph3
						pv2
						mb1
						mt3
						center
						tc
						white
						tracked
						ttl
						small_caps
						ba
						bw1
						b__blue
						onClick={() => setcurrentDate(Date.now())}
					>
						Today
					</Button>
				)}
			</Today>
			<MonthNav>
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
			</MonthNav>

			<DateFilter>
				<select>
					{years.map(y => (
						<option value={y} selected={y === intYear}>
							{y}
						</option>
					))}
				</select>
				<select>
					{[...Array(12).keys()].map(m => (
						<option value={m + 1} selected={m + 1 === intMonth}>
							{m + 1}
						</option>
					))}
				</select>

				<Button>Update</Button>
			</DateFilter>
		</Wrapper>
	);
};
