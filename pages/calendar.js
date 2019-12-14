import React, { useState } from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import Calendar from "../components/Calander";
import { withRaces } from "../data/with-races";

// Colors taken from index.css
// Un shuffled array
let eventColors = [
	// "#e7040f",
	// "#fd151b",
	// "#ff725c",
	// "#ff6300",
	// "#ffb30f",
	// "#ffd700",
	// "#fbf1a9",
	// "#5e2ca5",
	// "#a463f2",
	// "#d5008f",
	// "#ff41b4",
	// "#ff80cc",
	// "#ffa3d7",
	// "#137752",
	// "#19a974",
	// "#9eebcf",
	"#001b44",
	"#004a7f",
	"#1a73b2",
	"#7faccc"
];

const CalanderPage = ({ races = [], router }) => {
	const { year, month } = router.query;

	// new Date month arguement is index of month, similar to array index's, December === month 12 - 1 for index
	const date = year && month ? new Date(year, month) : Date.now();

	const [currentDate, setcurrentDate] = useState(date);

	const handleNextMonthClick = () => {
		const newDate = addMonths(currentDate, 1);
		setcurrentDate(newDate);
	};

	const handlePrevMonthClick = () => {
		const newDate = subMonths(currentDate, 1);
		setcurrentDate(newDate);
	};

	// Duplicate the number of colors if the lenght is greater then the number of races
	if (eventColors.length < races.length) {
		let multiplier = races.length / eventColors.length;
		multiplier = Math.ceil(multiplier);

		for (let i = 1; i < multiplier; i++) {
			eventColors = eventColors.concat(eventColors.map(x => x));
		}
	}

	const coloredRaces = races.map((race, i) => ({
		...race,
		eventColor: eventColors[i]
	}));

	return (
		<Page>
			<Head>
				<title>Calendar - DotWatcher.cc</title>
				<meta property="og:title" content="Calendar - DotWatcher.cc" />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<Header title="dotwatcher.cc" />

			<Calendar
				events={coloredRaces}
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

const enhance = compose(withRaces, withRouter);

export default enhance(CalanderPage);
