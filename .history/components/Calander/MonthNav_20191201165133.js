
import compose from "recompose/compose";
import format from "date-fns/format";
import differenceInCalendarMonths from "date-fns/difference_in_calendar_months";
import { handleFetchEvents } from "../../utils";


const MonthNav = ({
	handleNextMonthClick,
	handlePrevMonthClick,
	currentDate
}) => {
	const distanceBetweenMonths = differenceInCalendarMonths(currentDate, today);
	const month = format(currentDate, "MMM");
	const year = format(currentDate, "YYYY");

	return (
		<div class="calendar-month-nav">
			<div class="calendar-nav__placeholder">
				{distanceBetweenMonths > -3 && (
					<button
						class="calendar-month-nav__prev-date"
						onClick={handlePrevMonthClick}
					>
						<-
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
						->
					</button>
				)}
			</div>
		</div>
	);
};

export default enhance(MonthNav);
