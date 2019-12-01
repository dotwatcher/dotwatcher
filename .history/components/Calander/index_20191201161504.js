export default ({ events = [] }) => {
	const handleNextMonthClick = () => {};
	const handlePrevMonthClick = () => {};
	return (
    <MonthNav
    handleNextMonthClick={handleNextMonthClick}
    handlePrevMonthClick={handlePrevMonthClick}
  />
  <WeekHeader />
  <Layout />
	);
};
