import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Placeholder from '../placeholder';

const Map = styled.iframe`${tachyons}`;

class Iframe extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		const iframe = ReactDOM.findDOMNode(this.refs.iframe);
		iframe.addEventListener('load', this.props.onLoad);
	}

	render() {
		const Container = styled.div`
			height: 100vh;
			@media screen and (min-width: 64em) {
				height: ${this.props.offset ? 'calc(100vh - 75px)' : '100vh'};
			}
		${tachyons}`;
		return (
			<Container bg_near_white>
				{
					this.props.raceID ? <Map ref="iframe" id="trackleaders-iframe" w_100 h_100 ba bw0 src={`https://trackleaders.com/${this.props.raceID}f.php`} frameborder="0" {...this.props}/> : <Placeholder raceID="No race found" w_100 h_100/>
				}
			</Container>
		);
	}
}

Iframe.propTypes = {
	raceID: PropTypes.string,
	offset: PropTypes.number
};

Iframe.defaultProps = {
	raceID: '',
	offset: 0
};

export default Iframe;
