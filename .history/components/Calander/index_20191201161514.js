export default ({ events = [] }) => {
	const handleNextMonthClick = () => {};
	const handlePrevMonthClick = () => {};
	return (
		<Fragmetn>
			<MonthNav
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
			/>
			<WeekHeader />
			<Layout />
		</>
	);
};
