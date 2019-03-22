import React, {Component} from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Link from 'next/link';
import Header from '../components/header';
import Page from '../components/shared/page';
import Footer from '../components/footer';
import ResultsIndex from '../components/results-index';
import ResultsTable from '../components/results-table';
import ResultsContribute from '../components/results-contribute';
import {WithResults} from '../data/with-results';

const Heading = styled.header`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const P = styled.p`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

class App extends Component {
	render() {
		return (
			<Page>
				<Head>
					<title>{ this.props.race } { this.props.year } Results - DotWatcher.cc</title>
					<meta property="og:title" content={`${this.props.race} ${this.props.year} Results - DotWatcher.cc`}/>
					<meta property="og:description" content="A history of results from the ultra-cycling world, in one database."/>
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher"/>
					<meta name="twitter:creator" content="@dotwatcher"/>
					<meta name="twitter:title" content={`${this.props.race} ${this.props.year} Results - DotWatcher.cc`} />
					<meta name="twitter:description" content="A history of results from the ultra-cycling world, in one database." />
					<meta name="description" content="A history of results from the ultra-cycling world, in one database." />
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				{
					this.props.results.length >= 1 ? <Div mt3 mt4_l mh6_l>
					<Div pb5>
							<Link href="/results" passHref prefetch>
							<A ph3 db link near_black hover_blue>← All results</A>
						</Link>
						<Heading fl w_100 mb4 ph3>
							<H1 f3 f1_l fw6 lh_title mb0>
								{ this.props.race } { this.props.year } results
							</H1>
						</Heading>
							<ResultsTable type="race" results={this.props.results} focus={this.props.focus} racerClasses={this.props.racerClasses} activeClass={this.props.activeClass} racerCategories={this.props.racerCategories} activeCategory={this.props.activeCategory} finishLocations={this.props.finishLocations} activeLocation={this.props.activeLocation}/>
						<ResultsContribute/>
					</Div>
					</Div> : <ResultsIndex raceResultsByYear={this.props.raceResultsByYear} /> }
				<Footer/>
			</Page>
		);
	}
}

App.propTypes = {
	race: PropTypes.string,
	year: PropTypes.string,
	results: PropTypes.array,
	raceResultsByYear: PropTypes.array,
	focus: PropTypes.string
};

App.defaultProps = {
	race: '',
	year: '',
	results: [],
	raceResultsByYear: [],
	focus: ''
};

export default WithResults(App);
