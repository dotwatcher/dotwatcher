import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Placeholder from "@Components/placeholder";
import mq from "@Utils/media-query";

const Map = styled.iframe`
	height: 100%;
	width: 100%;
	border: 0;
`;

const Container = styled.div`
	height: 90vh;
	max-height: 1000px;
`;

class Iframe extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		const iframe = ReactDOM.findDOMNode(this.refs.iframe);
		if (iframe) {
			iframe.addEventListener("load", this.props.onLoad);
		}
	}

	render() {
		const { url, onLoad } = this.props;

		if (url && url.indexOf("maprogress") !== -1) {
			return (
				<Container>
					<Map
						ref="iframe"
						id="trackleaders-iframe"
						src={`${url}viewswitcher/switchview?mobile=true&returnurl=%2F`}
						frameborder="0"
						{...onLoad}
						allowFullScreen
					/>
				</Container>
			);
		} else if (url && url.indexOf("http") !== -1) {
			return (
				<Container>
					<Map
						ref="iframe"
						id="trackleaders-iframe"
						src={url}
						frameborder="0"
						{...onLoad}
						allowFullScreen
					/>
				</Container>
			);
		} else if (url) {
			return (
				<Container>
					<Map
						ref="iframe"
						id="trackleaders-iframe"
						src={`https://trackleaders.com/${url}f.php`}
						frameborder="0"
						{...onLoad}
						allowFullScreen
					/>
				</Container>
			);
		} else {
			return <Placeholder raceID="Live tracker coming soon" w_100 h_100 />;
		}
	}
}

export default Iframe;
