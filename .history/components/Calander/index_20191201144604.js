export default ({ events = [] }) => {
	return (
		<Calendar
			handleNextMonthClick={handleNextMonthClick}
			handlePrevMonthClick={handlePrevMonthClick}
		/>
	);
};
