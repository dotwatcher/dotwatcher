import { Fragment } from "react";
import MonthNav from "./MonthNav";
import WeekHeader from "./WeekHeader";
import Layout from "./Layout";

export default ({ events = [] }) => {
	const handleNextMonthClick = () => {};
	const handlePrevMonthClick = () => {};

	return (
		<Fragment>
			<MonthNav
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
				currentDate={Date.now()}
			/>
			<WeekHeader />
			<Layout />
		</Fragment>
	);
};
