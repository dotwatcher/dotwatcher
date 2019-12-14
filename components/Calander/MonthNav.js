import format from "date-fns/format";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import isWithinRange from "date-fns/is_within_range";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import getMonth from "date-fns/get_month";
import { useRef } from "react";
import Router from "next/router";

const Button = styled.button`
	${tachyons}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
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
	grid-area: nav;
	/* grid-column: 6 / 8; */
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 48em) {
		grid-column: 4 / 6;
		justify-content: space-between;
	}
`;

const Today = styled.div`
	grid-area: today;
	/* grid-column: 1 / 2; */

	button {
		cursor: pointer;
	}
`;

const DateFilter = styled.div`
	margin-top: var(--spacing-medium);

	select + select {
		margin-left: var(--spacing-medium);
	}
`;

const getYears = currentYear => {
	let years = [];
	for (let i = currentYear; i > currentYear - 5; i--) {
		years.push(i);
	}

	for (let i = currentYear; i < currentYear + 5; i++) {
		years.push(i);
	}

	years = [...new Set(years)];
	years.sort((a, b) => a - b);

	return years;
};

const Nav = ({
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

	console.log(currentDate);

	const monthRef = useRef(null);
	const yearRef = useRef(null);

	const years = getYears(intYear);

	const handleChange = () => {
		const { current: month } = monthRef;
		const { current: year } = yearRef;
		const date = new Date(year.value, month.value);

		setcurrentDate(date);

		const href = `/calendar/${year.value}/${month.value}`;
		const as = `/calendar/${year.value}/${month.value}`;
		Router.replace(href, as, { shallow: true });
	};

	const handleTodayClick = () => {
		Router.replace("/calendar", "/calendar", { shallow: true });
		setcurrentDate(Date.now());
	};

	const handlePrevClick = () => {
		handlePrevMonthClick();
	};

	const handleNextClick = () => {
		handleNextMonthClick();
	};

	return (
		<Wrapper>
			<Today>
				<Button
					f4
					bg_blue
					ph3
					pv2
					mb2
					mt0
					center
					tc
					white
					tracked
					ttl
					small_caps
					ba
					bw1
					b__blue
					onClick={handleTodayClick}
				>
					Today
				</Button>
			</Today>
			<MonthNav>
				<Placeholder>
					<CalenderChange near_black hover_blue onClick={handlePrevClick}>
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
					<CalenderChange near_black hover_blue onClick={handleNextClick}>
						Next
					</CalenderChange>
				</Placeholder>
			</MonthNav>

			<DateFilter>
				<select onChange={handleChange} name="year" ref={yearRef}>
					{years.map(y => (
						<option key={y} value={y} selected={y === intYear}>
							{y}
						</option>
					))}
				</select>
				<select onChange={handleChange} name="month" ref={monthRef}>
					{[...Array(12).keys()].map(m => (
						<option key={m} value={m} selected={m === intMonth}>
							{m + 1}
						</option>
					))}
				</select>
			</DateFilter>
		</Wrapper>
	);
};

export default Nav;
