import React from "react";
import { compose } from "recompose";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import withRaces from "../data/with-races";

class Calander extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page>
				<Head>
					<title>Calander – DotWatcher.cc</title>
				</Head>

				<Header title="dotwatcher.cc" />
				<h1>Hello</h1>
				<Footer />
			</Page>
		);
	}
}

const enhance = compose(withRaces);

export default Calander;
