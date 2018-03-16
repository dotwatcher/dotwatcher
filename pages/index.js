import React, {Component} from 'react';
import {createClient} from 'contentful';
import Header from '../components/header';
import Hero from '../components/hero';
import Wrapper from '../components/shared/wrapper';
import Grid from '../components/shared/grid';
import Post from '../components/post';
import Tweet from '../components/tweet';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		const client = createClient({
			space: '6hyijb95boju',
			accessToken: 'f214dba82579af555cd4839172570328cf8aee10e37bf5b83094953bb65fb317'
		});

		client.getEntries({
			content_type: '2wKn6yEnZewu2SCCkus4as',
			order: '-sys.createdAt'
		})
			.then(entries => {
				console.log('entries', entries.items);
				this.setState({
					posts: entries.items
				});
			});
	}

	render() {
		return (
			<div>
				<Header
					title="dotwatchers.cc"
				/>
				<Hero
					title="Follow the ride"
					byline="The best way to track the latest epic bike rides"
				/>

				<Grid>
					<Tweet tweetId="881966544456220673"/>
					<Tweet tweetId="974626768652062722"/>
					<Tweet tweetId="974624544458792961"/>
					<Tweet tweetId="971107777878855686"/>
				</Grid>

				<Wrapper>
					{
						this.state.posts.map(item => (
							<Post key={item.sys.id} title={item.fields.title} body={item.fields.body}/>
						))
					}
				</Wrapper>
			</div>
		);
	}
}

export default App;
