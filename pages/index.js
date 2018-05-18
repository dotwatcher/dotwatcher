import React, {Component} from 'react';
import Head from 'next/head';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Header from '../components/header';
import ContentBlock from '../components/content-block';
import Page from '../components/shared/page';
import RacePreview from '../components/race-preview';
import Footer from '../components/footer';
import {withCategories} from '../data/with-categories';

const Heading = styled.header`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const RaceWrap = styled.div`
	@media screen and (min-width: 60em) {
		margin-left: 16.666666667%;
	}
${tachyons}`;

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
				<Div mt3 mt4_l>
					{
						this.props.page.blocks.map(block => {
							return (
								<ContentBlock
									key={block.sys.id}
									block={block}
									race={this.props.races.filter(race => {
										return race.sys.id === block.race ? race : null;
									})}
								/>
							);
						})
					}
					<RaceWrap fl ph3_l pb2 w_100 w_two_thirds_l center mt5_ns className="cf">
						<Heading fl w_100 mb4 ph3>
							<H1 f4 fw6 ttu tracked bg_light_gray pa1>Upcoming races</H1>
						</Heading>
						{
							this.props.races.map(race => {
								return moment(race.data.raceEndDate).isAfter() ? <RacePreview key={race.sys.id} id={race.sys.id} data={race.data}/> : null;
							})
						}

						<Heading fl w_100 mv4 ph3>
							<H1 f4 fw6 mt4 ttu tracked bg_light_gray pa1>Past races</H1>
						</Heading>
						{
							this.props.races.slice(0).reverse().map(race => {
								return moment(race.data.raceEndDate).isBefore() ? <RacePreview key={race.sys.id} id={race.sys.id} data={race.data}/> : null;
							})
						}
					</RaceWrap>
				</Div>
				<Footer/>
			</Page>
		);
	}
}

App.propTypes = {
	races: PropTypes.array,
	page: PropTypes.array
};

App.defaultProps = {
	page: [],
	races: []
};

export default withCategories(App);
