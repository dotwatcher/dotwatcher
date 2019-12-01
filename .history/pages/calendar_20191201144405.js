import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import Footer from "../components/Calander";
import { withRaces } from "../data/with-races";

const Calander = ({ races = [], ...props }) => {
	console.log(props);
	return (
		<Page>
			<Head>
				<title>Calander – DotWatcher.cc</title>
			</Head>

			<Header title="dotwatcher.cc" />
			<h1>Hello</h1>

			<Calander events={races} />
			<Footer />
		</Page>
	);
};

Calander.propTypes = {
	races: PropTypes.array.isRequired
};

const enhance = compose(withRaces);

export default enhance(Calander);
