import React, {Component} from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';

import Header from '../components/header';
import KeyEvents from '../components/key-events';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import Placeholder from '../components/placeholder';
import {withEntries} from '../data/with-entries';

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
				<Wrapper fixed z_0 w_100 w_40_ns style={{'margin-left': '-.5rem'}}>
					<Placeholder w_100 vh_100 bg_light_gray/>
				</Wrapper>
				<Wrapper w_100 w_20_ns mt4 style={{'margin-left': '40%'}}>
					<KeyEvents posts={this.props.posts}/>
				</Wrapper>
				<Wrapper w_100 w_40_ns mt4>
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
