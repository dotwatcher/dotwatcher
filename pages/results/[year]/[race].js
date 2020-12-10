import React, { Component, Fragment } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import axios from "axios";
import debounce from "lodash.debounce";

import Link from "next/link";
import Header from "../../../components/header";
import Page from "../../../components/shared/page";
import Footer from "../../../components/footer";
import ResultsTable from "../../../components/results-table";
import ResultsContribute from "../../../components/results-contribute";
import { WithResults } from "../../../data/with-results";
import apiUrl from "../../../utils/api-url";
import { compose } from "recompose";
import { withRouter } from 'next/router'

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const Description = styled.p`
	${tachyons}
`;

class App extends Component {
	constructor(props) {
		super(props);

		this.handleSearchUpdate = debounce(this.handleSearchUpdate.bind(this), 200);

		this.hasNotes = this.hasNotes.bind(this);

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

	hasNotes() {
		return this.props.results.some(result => !!result.notes);
	}

	render() {
		// Sort by Rank, then sort by Scratched / OTL Finish
		let results = this.props.results.filter(r => r.position);
		results = results.sort((a, b) => a.position - b.position);
		let unpositioned = this.props.results.filter(r => !r.position);
		unpositioned = unpositioned.sort((a, b) => b.finsihed > a.finsihed);

		unpositioned = unpositioned.sort((a, b) => {
			return a.result === b.result ? 0 : b.result === "Scratched" ? -1 : 1;
		});

		results = [...results, ...unpositioned];

		return (
			<Page>
				<Head>
					<title>
						{this.props.name} {this.props.year} Results - DotWatcher.cc
					</title>
					<link
						rel="canonical"
						href={`https://dotwatcher.cc/results/${this.props.year}/${this.props.slug}`}
					/>
					<meta
						property="og:title"
						content={`${this.props.name} ${this.props.year} Results - DotWatcher.cc`}
					/>
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
					<meta
						name="twitter:title"
						content={`${this.props.name} ${this.props.year} Results - DotWatcher.cc`}
					/>
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

				<Div mt3 mt4_l mh6_l>
					<Div pb5>
						<Link href="/results" passHref>
							<A ph3 db link near_black hover_blue>
								← All results
							</A>
						</Link>
						<Heading fl w_100 mb4 ph3>
							<H1 f3 f1_l fw6 lh_title mb0>
								{this.props.name} {this.props.year} Results
							</H1>
							{this.props.description && (
								<Description measure_wide f4 lh_copy>
									{this.props.description.split("\n").map((item, key) => {
										return (
											<Fragment key={key}>
												{item}
												<br />
											</Fragment>
										);
									})}
								</Description>
							)}
						</Heading>

						{this.props.results.length ? (
							<ResultsTable
								type="race"
								results={results}
								focus={this.props.focus}
								racerClasses={this.props.racerClasses}
								activeClass={this.props.activeClass}
								racerCategories={this.props.racerCategories}
								activeCategory={this.props.activeCategory}
								finishlocations={this.props.finishlocations}
								activeLocation={this.props.activeLocation}
								hasNotes={this.hasNotes()}
							/>
						) : (
							<H3 ph3>
								No results have been published for {this.props.router.query.race || 'this race'}.
							</H3>
						)}
						<ResultsContribute />
					</Div>
				</Div>
				<Footer />
			</Page>
		);
	}
}

App.propTypes = {
	race: PropTypes.string,
	year: PropTypes.string,
	results: PropTypes.array,
	allRaces: PropTypes.array,
	focus: PropTypes.string
};

App.defaultProps = {
	race: "",
	year: "",
	results: [],
	raceResultsByYear: [],
	focus: ""
};

const enhance = compose(
	WithResults,
	withRouter
)

export default enhance(App);
