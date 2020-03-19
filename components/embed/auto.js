import React, { Component } from "react";
import PropTypes from "prop-types";
import Instagram from "react-instagram-embed";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const tweetIdMatch = /status\/(\d+)/i;
const youtubeDomain = /youtu.?be./;
const youtubeIdMatch = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i;
const A = styled.a`
	${tachyons}
`;

class AutoEmbed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inBrowser: false
		};
	}

	componentDidMount() {
		this.setState({ inBrowser: true });
	}

	render() {
		const tweetID = tweetIdMatch.exec(this.props.href);
		const youtubeID = youtubeIdMatch.exec(this.props.href);

		if (
			this.state.inBrowser &&
			this.props.href.includes("twitter") &&
			tweetID
		) {
			const { TwitterTweetEmbed } = require("react-twitter-embed");
			return <TwitterTweetEmbed tweetId={tweetID[1]} />;
		}
		if (this.state.inBrowser && this.props.href.includes("instagram.com/p/")) {
			return <Instagram url={this.props.href} />;
		}
		if (this.state.inBrowser && youtubeDomain.test(this.props.href)) {
			return (
				<iframe
					width="560"
					height="315"
					style={{ maxWidth: "100%" }}
					src={`https://www.youtube.com/embed/${youtubeID[1]}`}
					frameBorder="0"
					allowFullScreen
				/>
			);
		}
		if (this.state.inBrowser && this.props.href.includes("docs.google.com")) {
			return (
				<iframe
					width="640"
					height="724"
					style={{ maxWidth: "100%" }}
					src={this.props.href}
					frameborder="0"
					marginheight="0"
					marginwidth="0"
				/>
			);
		}
		console.log(this.props);
		if (
			(this.state.inBrowser &&
				this.props.href.includes("ridewithgps.com/embeds")) ||
			this.props.href.includes("vimeo.com")
		) {
			return (
				<iframe
					width="640"
					height="724"
					style={{ maxWidth: "100%" }}
					src={this.props.href}
					frameBorder="0"
					marginHeight="0"
					marginWidth="0"
				/>
			);
		}

		const { hostname } = new URL(this.props.href);

		return (
			<A
				link
				blue
				href={this.props.href}
				target={hostname !== "dotwatcher" ? "_blank" : "_self"}
			>
				{this.props.children[0] ? this.props.children[0] : this.props.href}
			</A>
		);
	}
}

AutoEmbed.propTypes = {
	href: PropTypes.string.isRequired
};

export default AutoEmbed;
