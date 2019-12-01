import { h } from "preact";
import { connect } from "unistore/preact";
import compose from "recompose/compose";
import withProps from "recompose/withProps";
import format from "date-fns/format";
import differenceInCalendarMonths from "date-fns/difference_in_calendar_months";
import { handleFetchEvents } from "../../utils";

const actions = store => ({});

const mapStateToProps = ["currentDate", "today"];

const enhance = compose(
	connect(mapStateToProps, actions),
	withProps(({ currentDate, today }) => ({}))
);

const MonthNav = ({
	month,
	year,
	handleNextMonthClick,
	handlePrevMonthClick,
	distanceBetweenMonths
}) => {
	return (
		<div class="calendar-month-nav">
			<div class="calendar-nav__placeholder">
				{distanceBetweenMonths > -3 && (
					<button
						class="calendar-month-nav__prev-date"
						onClick={handlePrevMonthClick}
					>
						<img src="/_ui/build/images/carousel-arrow.svg" />
					</button>
				)}
			</div>

			<div class="calendar-month-nav__date">
				<h2 class="t-h1 calendar-month-nav__date-month">{month}</h2>
				<span class="t-h4">{year}</span>
			</div>
			<div class="calendar-nav__placeholder">
				{distanceBetweenMonths < 3 && (
					<button
						class="calendar-month-nav__next-date"
						onClick={handleNextMonthClick}
					>
						<img src="/_ui/build/images/carousel-arrow.svg" />
					</button>
				)}
			</div>
		</div>
	);
};

export default enhance(MonthNav);
