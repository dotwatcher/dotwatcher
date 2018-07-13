import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Community extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inBrowser: false
		};
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		const iframe = ReactDOM.findDOMNode(this.refs.iframe);
		if (iframe) {
			iframe.addEventListener('load', this.props.onLoad);
		}

		this.setState({inBrowser: true});

		window.DiscourseEmbed = {
			discourseUrl: 'https://community.dotwatcher.cc/',
			topicId: this.props.id
		};
		const script = document.createElement('script');
		script.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js'
		document.body.appendChild(script);
	}

	render() {
		return (
				<div id='discourse-comments'></div>
			)
	}
}

export default Community;
