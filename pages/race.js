import React from 'react';
import {createClient} from 'contentful';
import Wrapper from '../components/shared/wrapper';

export default class extends React.Component {
	static getInitialProps ({query: {id}}) {
		return {id};
	}

	render () {
		return <Wrapper>
			<h1>My {this.props.id} blog post</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</p>
		</Wrapper>
	}
}
