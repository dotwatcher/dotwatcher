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
	if (!race.staticLeaderboard) return null;

	return (
		<React.Fragment>
			<TopRidersWrap fl w_100 pr3 pr0_ns mb4>
				<Header></Header>
				<Div measure_narrow>
					{race.staticLeaderboard.leadersCollection.items.map(
						(rider, index) => (
							<Rider
								numbered={false}
								position={index + 1}
								key={index}
								rider={rider}
							/>
						)
					)}
					<P f6 gray>
						Last updated{" "}
						<TimeAgo date={race.staticLeaderboard.sys.publishedAt} />
					</P>
				</Div>
			</TopRidersWrap>
		</React.Fragment>
	);
};

export default topRiders;
