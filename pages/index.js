import React, {Component} from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Header from '../components/header';
import KeyEvents from '../components/key-events';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import Placeholder from '../components/placeholder';
import {withEntries} from '../data/with-entries';

const Div = styled.div`
@media (min-width: 64em) {
	margin-left: 40%;
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

App.propTypes = {
	posts: PropTypes.array
};

App.defaultProps = {
	posts: []
};

export default withEntries(App);
