import React, {Component} from 'react';
import Head from 'next/head';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Header from '../components/header';
import Page from '../components/shared/page';
import Wrapper from '../components/shared/wrapper';
import Placeholder from '../components/placeholder';
import RacePreview from '../components/race-preview';
import {withCategories} from '../data/with-categories';

const Div = styled.div`
@media (min-width: 64em) {
	margin-left: 40%;
}
${tachyons}`;
const H1 = styled.h1`${tachyons}`;

class App extends Component {
	render() {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>🏔 Dotwatcher</title>
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Wrapper fixed_l z_0 w_100 w_40_l className="cf">
					<Placeholder relative w_100 vh_40 vh_100_l bg_light_gray/>
				</Wrapper>
				<Div fl ph3 pb2 w_100 w_60_l mt5_l>
					<H1 f2 ph3 ttu tracked>Upcoming races</H1>
					{
						this.props.races.map(race => {
							if (moment(race.data.raceDate).isAfter()) {
								return <RacePreview key={race.sys.id} id={race.sys.id} data={race.data}/>;
							}
						})
					}

					<H1 f2 ph3 ttu tracked>Past races</H1>
					{
						this.props.races.map(race => {
							if (moment(race.data.raceDate).isBefore()) {
								return <RacePreview key={race.sys.id} id={race.sys.id} data={race.data}/>;
							}
						})
					}
				</Div>
			</Page>
		);
	}
}

App.propTypes = {
	races: PropTypes.array
};

App.defaultProps = {
	races: []
};

export default withCategories(App);
