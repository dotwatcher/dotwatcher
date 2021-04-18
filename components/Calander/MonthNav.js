import format from "date-fns/format";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import getMonth from "date-fns/get_month";
import { useRef } from "react";
import Router from "next/router";
import mq from "@Utils/media-query";
import Button from "@Components/UI/Button";
import Select from "@Components/UI/OptionSelect";

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

	button {
		cursor: pointer;
	}
`;

const StyledSelect = styled(Select)`
	& + & {
		${mq.smDown`
			margin-top: var(--spacing-medium);
		`}

		${mq.smUp`
			margin-left: var(--spacing-medium);
		`}
	}
`;

const DateFilter = styled.div`
	margin-top: var(--spacing-medium);
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
	console.log("adsadsads");
	const monthRef = useRef(null);
	const yearRef = useRef(null);

	const years = getYears(intYear);

	const handleChange = () => {
		const { current: month } = monthRef;
		const { current: year } = yearRef;
		const date = new Date(year.value, month.value);

		setcurrentDate(date);

		const href = `/calendar/${year.value}/${parseInt(month.value) + 1}`;

		window.history.pushState("", "", href);
	};

	const handleTodayClick = () => {
		Router.replace("/calendar", "/calendar", { shallow: true });
		setcurrentDate(Date.now());
	};

	const handlePrevClick = () => {
		const { current: month } = monthRef;
		const { current: year } = yearRef;

		const href = `/calendar/${year.value}/${parseInt(month.value) + 1}`;

		window.history.pushState("", "", href);
		handlePrevMonthClick();
	};

	const handleNextClick = e => {
		const { current: month } = monthRef;
		const { current: year } = yearRef;

		const href = `/calendar/${year.value}/${parseInt(month.value) + 1}`;

		window.history.pushState("", "", href);
		handleNextMonthClick();
	};

	return (
		<Wrapper>
			<Today>
				<Button secondary type="button" onClick={handleTodayClick}>
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
				<StyledSelect
					onChange={handleChange}
					name="year"
					ref={yearRef}
					value={years.find(y => y === intYear)}
				>
					{years.map(y => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</StyledSelect>

				<StyledSelect
					onChange={handleChange}
					name="month"
					ref={monthRef}
					value={[...Array(12).keys()].find(m => m === intMonth)}
				>
					{[...Array(12).keys()].map(m => (
						<option key={m} value={m}>
							{m + 1}
						</option>
					))}
				</StyledSelect>
			</DateFilter>
		</Wrapper>
	);
};

export default Nav;
