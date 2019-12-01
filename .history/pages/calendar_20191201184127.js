import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import Calendar from "../components/Calander";
import { withRaces } from "../data/with-races";

const CalanderPage = ({ races = [], ...props }) => {
	console.log(races);

	const [currentDate, setcurrentDate] = useState(Date.now());
	return (
		<Page>
			<Head>
				<title>Calander – DotWatcher.cc</title>
			</Head>

			<Header title="dotwatcher.cc" />
			<h1>Hello</h1>

			<Calendar
				events={races}
				currentDate={currentDate}
				setcurrentDate={setcurrentDate}
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
