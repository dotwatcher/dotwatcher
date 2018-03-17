import React, {Component} from 'react';
import {withEntries} from '../data/with-entries';
import Header from '../components/header';
import Hero from '../components/hero';
import Wrapper from '../components/shared/wrapper';
import Post from '../components/post';

class App extends Component {
	render() {
		return (
			<div>
				<Header
					title="dotwatchers.cc"
				/>
				<Hero
					title="Follow the rides"
					byline="The best way to track the latest epic bike rides"
				/>

				<Wrapper>
					{
						this.props.posts.map(item => (
							<Post key={item.sys.id} data={item.data}/>
						))
					}
				</Wrapper>
			</div>
		);
	}
}

export default withEntries(App);
