import PropTypes from 'prop-types';
import React from 'react';
import Rider from './rider';
import {createClient} from 'contentful';
import request from 'superagent';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import vars from '../../data/api-vars';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const TopRidersWrap = styled.div`${tachyons}`;

class topRiders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leaderboard: {}
		};
	}

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	async componentDidMount() {
		this.state.leaderboard = [];
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const contenfulQuery = {
			content_type: 'leaderboard', // eslint-disable-line camelcase
			'fields.race.sys.id': this.props.raceID
		};

		const leaderboardUrl = `https://dotwatcher.scrapey.xyz/api/pages`;

		let leaderboard = [];
		request
			.get(leaderboardUrl)
			.query({
				'access_token': process.env.SCRAPEY_API_KEY,
				'order': 'timestamp DESC',
				'filter[where][url]': `http://trackleaders.com/${this.props.trackleadersID}`,
				'limit': 1
			})
			.end((err, res) => {
				if (err) {
					return;
				}
				if (res.body.length === 0) {
					return;
				}
				let data = res.body[0].data.leaderboard.sort((a, b) => parseFloat(b.mile) - parseFloat(a.mile));
				data = data.slice(0, 10);

				leaderboard = data.map((item, index) => {
					return {
						sys: {
							id: index
						},
						fields: {
							name: item.name,
							distance: parseFloat(item.kilometre).toFixed(0)
						}
					};
				});

				this.setStateAsync({leaderboard});
			});

		if (this.state.leaderboard.length === 0) {
			leaderboard = [];
			const response = await client.getEntries(contenfulQuery);
			let leaderboard = {};
			for (const item of response.items) {
				if (item.fields.leaders) {
					leaderboard = item.fields.leaders;
				} else {
					leaderboard = [
						{
							sys: {
								id: 0
							},
							fields: {
								name: 'No report yet'
							}
						}
					];
				}
			}
			await this.setStateAsync({leaderboard});
		}
	}

	render() {
		return (
			<TopRidersWrap fl w_50 w_100_ns pr3 pr0_ns mb4>
				<Header>
					<H2 ttu tracked f5 mt0 pb1 bb bw1 b__light_gray measure_narrow>
						Leaderboard
					</H2>
				</Header>
				<Div>
					{
						Object.keys(this.state.leaderboard).length !== 0 ? this.state.leaderboard.map(rider => (
							<Rider key={rider.sys.id} rider={rider.fields}/>
						)) : <P f6 b>Loading...</P>
					}
				</Div>
			</TopRidersWrap>
		);
	}
}

topRiders.propTypes = {
	raceID: PropTypes.string,
	trackleadersID: PropTypes.string
};

topRiders.defaultProps = {
	raceID: '',
	trackleadersID: ''
};

export default topRiders;
