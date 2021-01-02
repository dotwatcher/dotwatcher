import PropTypes from "prop-types";
import React from "react";
import Rider from "./rider";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import TimeAgo from "react-timeago";

const H2 = styled.h2`
	${tachyons}
`;
const Header = styled.header`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const P = styled.p`
	${tachyons}
`;
const TopRidersWrap = styled.div`
	${tachyons}
`;

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
					{race.fields.staticLeaderboard.fields.leaders.length
						? race.fields.staticLeaderboard.fields.leaders.map(
								(rider, index) => (
									<Rider
										numbered={false}
										position={index + 1}
										key={rider.sys.id}
										rider={rider.fields}
									/>
								)
						  )
						: null}
					<P f6 gray>
						Last updated{" "}
						<TimeAgo date={race.fields.staticLeaderboard.sys.updatedAt} />
					</P>
				</Div>
			</TopRidersWrap>
		</React.Fragment>
	);
};

export default topRiders;
