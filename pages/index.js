import React, {Component} from 'react';

import Head from 'next/head';
import Header from '../components/header';
import Hero from '../components/hero';
import KeyEvents from '../components/key-events';
import Page from '../components/shared/page';
import Post from '../components/post';
import PropTypes from 'prop-types';
import Wrapper from '../components/shared/wrapper';
import {withEntries} from '../data/with-entries';

class App extends Component {
	render() {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>Dotwatcher</title>
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Hero
					title="Follow the ride"
					byline="The best way to track the latest epic bike rides"
				/>

				<Wrapper w_100 w_20_ns>
					<KeyEvents posts={this.props.posts}/>
				</Wrapper>
				<Wrapper w_100 w_80_ns>
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
export let undecorated = App;
