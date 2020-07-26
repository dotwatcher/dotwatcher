import React, { Component, Fragment } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import axios from "axios";
import debounce from "lodash.debounce";

import Header from "../../components/header";
import Page from "../../components/shared/page";
import Footer from "../../components/footer";
import ResultsIndex from "../../components/results-index";

import { WithResults } from "../../data/with-results";
import apiUrl from "../../utils/api-url";

class Results extends Component {
	constructor(props) {
		super(props);

		this.handleSearchUpdate = debounce(this.handleSearchUpdate.bind(this), 200);

		this.state = {
			races: this.props.allRaces,
			riders: [],
			loading: false
		};
	}

	async handleSearchUpdate(value) {
		if (value.length === 0) {
			this.setState({ races: this.props.allRaces, riders: [] });
			return;
		}

		if (value.length <= 2) return;

		await this.setState({ loading: true });

		const races = await this.searchRace(value);
		const riders = await this.searchRider(value);

		await this.setState({
			races,
			riders,
			loading: false
		});
	}

	async searchRace(value) {
		// toLower is performed on the SQL query. Able to lower case race name column and search value together
		try {
			const res = await axios.get(
				apiUrl(`api/search/race-by-name?name=${value}`)
			);

			let races = res.data;

			return races;
		} catch (err) {
			console.log(err);
		}
	}

	async searchRider(value) {
		// toLower is performed on the SQL query. Able to lower case race name column and search value together
		try {
			const res = await axios.get(
				apiUrl(`api/search/rider-by-name?name=${value}`)
			);

			let riders = res.data;

			return riders;
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Page>
				<Head>
					<title>Results - DotWatcher.cc</title>
					<link rel="canonical" href="https://dotwatcher.cc/results" />
					<meta property="og:title" content="Results - DotWatcher.cc" />
					<meta
						property="og:description"
						content="A history of results from the ultra-cycling world, in one database."
					/>
					<meta
						property="og:image"
						content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
					/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher" />
					<meta name="twitter:creator" content="@dotwatcher" />
					<meta name="twitter:title" content="Results - DotWatcher.cc" />
					<meta
						name="twitter:description"
						content="A history of results from the ultra-cycling world, in one database."
					/>
					<meta
						name="description"
						content="A history of results from the ultra-cycling world, in one database."
					/>
				</Head>
				<Header user={this.props.user} title="dotwatcher.cc" />

				<ResultsIndex
					allRiders={this.state.riders}
					allRaces={this.state.races}
					loading={this.state.loading}
					handleSearchUpdate={this.handleSearchUpdate}
				/>

				<Footer />
			</Page>
		);
	}
}

Results.propTypes = {
	race: PropTypes.string,
	year: PropTypes.string,
	results: PropTypes.array,
	allRaces: PropTypes.array,
	focus: PropTypes.string
};

Results.defaultProps = {
	race: "",
	year: "",
	results: [],
	raceResultsByYear: [],
	focus: ""
};

export default WithResults(Results);
