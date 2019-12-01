import { Fragment } from "react";
import MonthNav from "./MonthNav";
import WeekHeader from "./WeekHeader";

export default ({ events = [] }) => {
	const handleNextMonthClick = () => {};
	const handlePrevMonthClick = () => {};
	return (
		<Fragment>
			<MonthNav
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
			/>
			<WeekHeader />
			<Layout />
		</Fragment>
	);
};
