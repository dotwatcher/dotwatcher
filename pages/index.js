import React, {Component} from 'react';
import {createClient} from 'contentful';

import Header from '../components/header';

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

		client.getEntries()
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
				<Header title="dotwatchers.cc"/>
				<main className="ph4">
					<h1 className="f-headline">Hello, World!</h1>
					{
						this.state.posts.map(item => (
							<div key={item.sys.id}>
								<h1>{item.fields.name}</h1>
								<p className="lh-copy measure-wide">{item.fields.biography}</p>
							</div>
						))
					}
				</main>
			</div>
		);
	}
}

export default App;
