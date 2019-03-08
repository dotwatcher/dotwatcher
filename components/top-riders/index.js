import PropTypes from 'prop-types';
import React from 'react';
import Rider from './rider';
import request from 'superagent';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const TopRidersWrap = styled.div`${tachyons}`;

class topRiders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leaderboard: []
		};
	}

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	async componentDidMount() {
		if (this.props.race.fields.leaderboard === true) {
			const leaderboardUrl = `https://dotwatcher.scrapey.xyz/api/pages`;
			let filterUrl

			if (`http://trackleaders.com/${this.props.race.fields.trackleadersRaceId}` === 'http://trackleaders.com/transconrace18') {
				filterUrl = 'https://frrt.org/tcrno6/riders'
			} else {
				filterUrl = `http://trackleaders.com/${this.props.race.fields.trackleadersRaceId}`
			}

			let leaderboard = [];
			request
				.get(leaderboardUrl)
				.query({
					'access_token': process.env.SCRAPEY_API_KEY,
					'filter[order]': 'timestamp DESC',
					'filter[where][url]': filterUrl,
					'filter[limit]': 1
				})
				.end((err, res) => {
					if (err) {
						return;
					}
					if (res.body.length === 0) {
						return;
					}
					let data = res.body[0].data.leaderboard.sort((a, b) => {
						if (typeof (a.mile) !== 'undefined') {
							return parseFloat(b.mile) - parseFloat(a.mile);
						} else {
							return parseFloat(a.dtf) - parseFloat(b.dtf);
						}
					})
					data = data.slice(0, 10);

					leaderboard = data.map((item, index) => {
						return {
							sys: {
								id: index
							},
							fields: {
								name: item.name,
								distance: typeof item.kilometre !== 'undefined' ? parseFloat(item.kilometre).toFixed(0) : null
							}
						};
					});
					this.setStateAsync({leaderboard});
				});
		}
	}

	render() {
		let leaderboard = {}
		let isFinalResult = 'staticLeaderboard' in this.props.race.fields
		if ('staticLeaderboard' in this.props.race.fields) {
			leaderboard = this.props.race.fields.staticLeaderboard.fields.leaders
		}
		if (this.props.race.fields.leaderboard) {
			leaderboard = this.state.leaderboard
		}
		if (this.props.race.fields.leaderboard || this.props.race.fields.staticLeaderboard) {
			return (
				<React.Fragment>
					<TopRidersWrap fl w_100 pr3 pr0_ns mb4>
						<Header>
							<H2 ttu tracked f5 fw6 mt0 pb1 bb bw1 b__light_gray measure_narrow>
								Leaderboard
							</H2>
						</Header>
						<Div measure_narrow>
							{
								leaderboard.length ? leaderboard.map((rider, index) => (
									<Rider numbered={isFinalResult} position={index + 1} key={rider.sys.id} rider={rider.fields}/>
								)) : <P f6 b>Loading...</P>
							}
						</Div>
					</TopRidersWrap>
				</React.Fragment>
			)
		} else {
			return null
		}
	}
}

topRiders.propTypes = {
	race: PropTypes.object
};

topRiders.defaultProps = {
	race: {}
};

export default topRiders;
