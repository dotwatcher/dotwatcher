import React from 'react';

import Head from 'next/head';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import PropTypes from 'prop-types';
import Header from '../components/header';
import KeyEvents from '../components/key-events';
import {Link} from '../routes';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import {withEntries} from '../data/with-entries';
import Placeholder from '../components/placeholder';

const KeyEventsWrapper = styled.div`
@media (min-width: 64em) {
	margin-left: 40%;
}
${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

class Race extends React.Component {
	render() {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>Race name</title>
					<meta property="og:title" content="Race name"/>
					<meta property="og:image" content=""/>
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Wrapper fixed_l z_0 w_100 w_40_l className="cf">
					<Placeholder relative w_100 vh_40 vh_100_l bg_light_gray raceID={this.props.posts[0].data.categories[0].fields.trackleadersRaceId}/>
					<Div fixed_l bottom_0_l left_0_l w_40_l z_2 bg_dark_gray near_white pa2 tc>
						<Link route="page" params={{type: 'page', id: '6CO2ZfSWlyOkcQsG62iGaE'}} passHref prefetch><A near_white underline>Click here for tracker tips</A></Link>
					</Div>
				</Wrapper>
				<KeyEventsWrapper fl ph3 pb2 w_100 w_30_m w_20_l mt4_l>
					<KeyEvents posts={this.props.posts}/>
				</KeyEventsWrapper>
				<Wrapper ph3 pb2 w_100 w_70_m w_40_l mt4_l>
					{
						this.props.posts.map(item => (
							<Post key={item.sys.id} id={item.sys.id} data={item.data}/>
						))
					}
				</Wrapper>
			</Page>
		);
	}
}

Race.propTypes = {
	posts: PropTypes.array
};

Race.defaultProps = {
	posts: []
};

export default withEntries(Race);
