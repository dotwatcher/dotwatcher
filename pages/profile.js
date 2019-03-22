import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Link from 'next/link';
import Header from '../components/header';
import Page from '../components/shared/page';
import Footer from '../components/footer';
import ResultsTable from '../components/results-table';
import ResultsContribute from '../components/results-contribute';
import { WithProfile } from '../data/with-profile';

const Heading = styled.header`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

class App extends Component {
	render() {
		return (
			<Page>
				<Head>
					<title>{this.props.name}’s race results - DotWatcher.cc</title>
					<meta property="og:title" content={`${this.props.name}’s race results - DotWatcher.cc`} />
					<meta property="og:description" content={`Historic results from ultra-cycling races for ${this.props.name}`} />
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher"/>
					<meta name="twitter:creator" content="@dotwatcher"/>
					<meta name="twitter:title" content={`${this.props.name}’s race results - DotWatcher.cc`} />
					<meta name="twitter:description" content={`Historic results from ultra-cycling races for ${this.props.name}`} />
					<meta name="twitter:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg" />
					<meta name="description" content={`Historic results from ultra-cycling races for ${this.props.name}`} />
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Div mt3 mh6_l>
					<Div pb5 className="cf">
						<Link href={`/results`} passHref prefetch>
							<A ph3 near_black hover_blue>← All results</A>
						</Link>
						<Heading fl w_100 mb3 ph3>
							<H1 f3 f1_l fw6 lh_title>{this.props.name}’s race results</H1>
						</Heading>
						<ResultsTable type="profile" results={this.props.profile} />
						<ResultsContribute />
					</Div>
				</Div>
				<Footer />
			</Page>
		);
	}
}

App.propTypes = {
	name: PropTypes.string,
	profile: PropTypes.array
};

App.defaultProps = {
	name: '',
	profile: [],
};

export default WithProfile(App);
