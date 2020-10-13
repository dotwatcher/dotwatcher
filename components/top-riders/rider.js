import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

const Wrap = styled.dl`
	${tachyons}
`;
const RiderName = styled.dt`
	${tachyons}
`;
const Name = styled.span`
	${tachyons}
`;
const RiderStat = styled.dt`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const regex = /^#\d*\s/;

const Rider = ({ rider, numbered, position }) => {
	if (!rider) {
		console.log(`No rider in leaderboard found for positon ${position}`);

		return null;
	}

	const numberlessName = rider.name.replace(regex, "");
	return (
		<Wrap f6 mt0 mb2 lh_copy className="cf">
			<RiderName fl f6>
				{numbered ? `${position}. ` : null}
				<Link
					href={`/profile?name=${numberlessName}`}
					as={`/profile/${numberlessName}`}
					passHref
				>
					<A
						link
						near_black
						hover_blue
						underline
						title={`See ${rider.name}’s past results`}
					>
						<Name fw6>{rider.name}</Name>
					</A>
				</Link>
			</RiderName>
			{rider.distance ? (
				<RiderStat fr f6 gray>
					{rider.distance}km
				</RiderStat>
			) : null}
		</Wrap>
	);
};

Rider.propTypes = {
	rider: PropTypes.object.isRequired,
	numbered: PropTypes.bool,
	position: PropTypes.number
};

export default Rider;
