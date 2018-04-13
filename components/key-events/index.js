import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Event from './event';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Div = styled.div`${tachyons}`;
const List = styled.ul`${tachyons}`;
const Rider = styled.dl`${tachyons}`;
const RiderName = styled.dt`${tachyons}`;
const RiderDist = styled.dd`${tachyons}`;

const keyEvents = ({posts}) => {
	return (
		<Div>
			<Header pt4_l>
				<H2 pt3>
					Top riders
				</H2>
			</Header>
			<Div>
				<Rider f6 mt0 mb2 lh_copy className="cf">
					<RiderName fl b underline>Thomas Hagler</RiderName>
					<RiderDist fr tr gray>735km</RiderDist>
				</Rider>
				<Rider f6 mt0 mb2 lh_copy className="cf">
					<RiderName fl b underline>Polly Fox</RiderName>
					<RiderDist fr tr gray>732km</RiderDist>
				</Rider>
				<Rider f6 mt0 mb2 lh_copy className="cf">
					<RiderName fl b underline>Kenneth Lira</RiderName>
					<RiderDist fr tr gray>730km</RiderDist>
				</Rider>
				<Rider f6 mt0 mb2 lh_copy className="cf">
					<RiderName fl b underline>Tom Pritchard</RiderName>
					<RiderDist fr tr gray>701km</RiderDist>
				</Rider>
				<Rider f6 mt0 mb2 lh_copy className="cf">
					<RiderName fl b underline>Millie Bowen</RiderName>
					<RiderDist fr tr gray>693km</RiderDist>
				</Rider>
			</Div>
			<Header pt4>
				<H2 pt3>
					Key moments
				</H2>
			</Header>
			<List list="true" pa0>
				{
					posts.filter(post => post.data.keyEvent === true)
						.map(post => (
							<Event key={post.sys.id} data={post.data} id={post.sys.id}/>
						))
				}
			</List>
		</Div>
	);
};

keyEvents.propTypes = {
	posts: PropTypes.array.isRequired
};

export default keyEvents;
