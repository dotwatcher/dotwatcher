import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Placeholder from "../placeholder";
import mq from "../../utils/media-query";

const Map = styled.iframe`
	${tachyons}
	height: 100%;
	${mq.smUp`
		height: calc(100vh - 89px);
	`}
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
		const Container = styled.div`
			margin-top: ${this.props.raceID.indexOf("maprogress") !== -1
				? "75px"
				: "0"};
			height: 80vh;
			@media screen and (min-width: 64em) {
				height: ${this.props.raceID.indexOf("maprogress") !== -1
					? "calc(100vh - 75px)"
					: "100vh"};
			}
			${tachyons}
		`;
		let iframe = <Placeholder raceID="Live tracker coming soon" w_100 h_100 />;
		if (this.props.raceID && this.props.raceID.indexOf("maprogress") !== -1) {
			iframe = (
				<Map
					ref="iframe"
					id="trackleaders-iframe"
					w_100
					ba
					bw0
					src={`${this.props.raceID}viewswitcher/switchview?mobile=true&returnurl=%2F`}
					frameborder="0"
					{...this.props.onLoad}
					allowFullScreen
				/>
			);
		} else if (this.props.raceID && this.props.raceID.indexOf("http") !== -1) {
			iframe = (
				<Map
					ref="iframe"
					id="trackleaders-iframe"
					w_100
					h_100
					ba
					bw0
					src={`${this.props.raceID}`}
					frameborder="0"
					{...this.props.onLoad}
					allowFullScreen
				/>
			);
		} else if (this.props.raceID) {
			iframe = (
				<Map
					ref="iframe"
					id="trackleaders-iframe"
					w_100
					h_100
					ba
					bw0
					src={`https://trackleaders.com/${this.props.raceID}f.php`}
					frameborder="0"
					{...this.props.onLoad}
					allowFullScreen
				/>
			);
		}

		return <Container bg_near_white>{iframe}</Container>;
	}
}

Iframe.propTypes = {
	raceID: PropTypes.string,
	offset: PropTypes.bool
};

Iframe.defaultProps = {
	raceID: "",
	offset: false
};

export default Iframe;
