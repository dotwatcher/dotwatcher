import PropTypes from 'prop-types';
import React from 'react';
import Rider from './rider';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const TopRidersWrap = styled.div`${tachyons}`;

const topRiders = ({ race }) => {
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
						race.fields.staticLeaderboard.fields.leaders.length ? race.fields.staticLeaderboard.fields.leaders.map((rider, index) => (
							<Rider numbered={false} position={index + 1} key={rider.sys.id} rider={rider.fields}/>
						)) : <P f6 b>Loading...</P>
					}
				</Div>
			</TopRidersWrap>
		</React.Fragment>
	)
}


topRiders.propTypes = {
	race: PropTypes.object
};

topRiders.defaultProps = {
	race: {}
};

export default topRiders;
