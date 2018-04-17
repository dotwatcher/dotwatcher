import React from 'react';

import Head from 'next/head';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import PropTypes from 'prop-types';
import Header from '../components/header';
import KeyEvents from '../components/key-events';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import {withEntries} from '../data/with-entries';
import Placeholder from '../components/placeholder';

const Div = styled.div`
@media (min-width: 64em) {
	margin-left: 40%;
}
${tachyons}`;

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
					<Placeholder relative w_100 vh_40 vh_100_l bg_light_gray/>
				</Wrapper>
				<Div fl ph3 pb2 w_100 w_30_m w_20_l mt4_l>
					<KeyEvents posts={this.props.posts}/>
				</Div>
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
