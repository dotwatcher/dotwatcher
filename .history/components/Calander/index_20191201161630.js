import { Fragment } from "react";
import MonthNav from "./month-nav";

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
