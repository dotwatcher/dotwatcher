import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import {Link} from '../../routes';
import Wrapper from '../shared/wrapper';
import Iframe from '../iframe';
import Placeholder from '../placeholder';

const A = styled.a`${tachyons}`;
const Toggle = styled.a`${tachyons}`;
const Tips = styled.div`
	left: 50%;
	transform: translateX(-50%);
	bottom: var(--spacing-small);
${tachyons}`;

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMap: false,
			inBrowser: false,
			width: 320
		};
		this.toggleMap = this.toggleMap.bind(this);
	}

	updateWindowWidth() {
		this.setState({
			showMap: window.innerWidth >= 1024,
			width: window.innerWidth,
			inBrowser: true
		});
	}

	toggleMap() {
		this.setState(
			prevState => ({...prevState, showMap: !prevState.showMap})
		);
	}

	componentDidMount() {
		this.updateWindowWidth();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth.bind(this));
	}

	render() {
		let content = (
			<Wrapper fixed_l z_0 w_100 w_40_l bg_near_white relative cf>
				<Placeholder raceID="Loading" w_100 h_100/>
			</Wrapper>
		);
		if (this.state.inBrowser && this.state.width >= 1024) {
			content = (
				<Wrapper fixed_l z_0 w_100 w_40_l bg_near_white relative cf>
					<Iframe raceID={this.props.raceID}/>
					<Tips absolute_l z_2 tc>
						<Link route="page" params={{type: 'page', id: '6CO2ZfSWlyOkcQsG62iGaE'}} passHref><A bg_black_80 hover_bg_near_black f6 lh_solid pa2 near_white underline>Click here for tracker tips</A></Link>
					</Tips>
				</Wrapper>
			);
		} else if (this.state.inBrowser && this.state.width < 1024) {
			content = (
				<Wrapper w_100 tc pa3>
					<Toggle f6 link dim br2 ph3 pv2 mb2 dib w4 tc white bg_blue hover_bg_light_blue tracked ttu onClick={this.toggleMap}>
						{this.state.showMap ? 'Hide map' : 'Show map'}
					</Toggle>
					{this.state.showMap ? <Iframe raceID={this.props.raceID}/> : null}
				</Wrapper>
			);
		}
		return content;
	}
}

MapContainer.propTypes = {
	raceID: PropTypes.string
};

MapContainer.defaultProps = {
	raceID: ''
}

export default MapContainer;
