import React, { useState } from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import Calendar from "../components/Calander";
import { withRaces } from "../data/with-races";

const CalanderPage = ({ races = [] }) => {
	const [currentDate, setcurrentDate] = useState(Date.now());

	const handleNextMonthClick = () => {
		const newDate = addMonths(currentDate, 1);
		setcurrentDate(newDate);
	};

	const handlePrevMonthClick = () => {
		const newDate = subMonths(currentDate, 1);
		setcurrentDate(newDate);
	};

	return (
		<Page>
			<Head>
				<title>Calander – DotWatcher.cc</title>
			</Head>

			<Header title="dotwatcher.cc" />

			<Calendar
				events={races}
				currentDate={currentDate}
				setcurrentDate={setcurrentDate}
				handleNextMonthClick={handleNextMonthClick}
				handlePrevMonthClick={handlePrevMonthClick}
			/>
			<Footer />
		</Page>
	);
};

CalanderPage.propTypes = {
	races: PropTypes.array.isRequired
};

const enhance = compose(withRaces);

export default enhance(CalanderPage);
