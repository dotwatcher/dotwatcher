import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Placeholder from './placeholder';

class Tweet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inBrowser: false
		};
	}

	componentDidMount() {
		this.setState({inBrowser: true});
	}

	render() {
		let tweet = null;
		if (this.state.inBrowser) {
			const {TwitterTweetEmbed} = require('react-twitter-embed');
			tweet = <TwitterTweetEmbed tweetId={this.props.tweetId}/>;
		} else {
			tweet = <Placeholder/>;
		}

		return tweet;
	}
}

Tweet.propTypes = {
	tweetId: PropTypes.string.isRequired
};

export default Tweet;
