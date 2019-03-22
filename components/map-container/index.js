import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';
import Button from '../shared/button';
import Wrapper from '../shared/wrapper';
import Iframe from '../iframe';
import Placeholder from '../placeholder';

const A = styled.a`${tachyons}`;
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
			width: 320,
			loading: true
		};
		this.toggleMap = this.toggleMap.bind(this);
	}

	updateWindowWidth() {
		const width = window.innerWidth;
		if (width !== this.state.width) {
			this.setState({
				showMap: window.innerWidth >= 1024,
				width: window.innerWidth,
				inBrowser: true,
				loading: true
			});
		}
	}

	toggleMap() {
		window.scroll(0, 0);
		this.setState(
			prevState => ({...prevState, showMap: !prevState.showMap})
		);
	}

	componentDidMount() {
		this.setState({
			showMap: window.innerWidth >= 1024,
			width: window.innerWidth,
			inBrowser: true
		});
		this.updateWindowWidth();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth.bind(this));
	}

	shouldComponentUpdate() {
		return this.state.loading
	}

	iframeLoaded() {
		this.setState(
			prevState => ({...prevState, loading: false})
		);
	}

	render() {
		const DesktopWrapper = styled.div`
			top: ${this.props.offset ? 'inherit' : 0};
		${tachyons}`;
		let content = (
			<Wrapper fixed_l z_0 w_100 w_40_l bg_near_white relative cf>
				<Placeholder raceID="Loading" w_100 h_100/>
			</Wrapper>
		);
		if (this.state.inBrowser && this.state.width >= 1024) {
			content = (
				<DesktopWrapper fixed_l z_0 w_100 w_40_l bg_near_white relative cf>
					<Iframe onLoad={this.iframeLoaded.bind(this)} raceID={this.props.raceID} offset={this.props.offset}/>
					<Tips absolute_l z_2 tc>
						<Link href={`/page?id=6CO2ZfSWlyOkcQsG62iGaE`} as="/page/6CO2ZfSWlyOkcQsG62iGaE" passHref><A bg_black_80 hover_bg_near_black f6 lh_solid pa2 near_white underline>Click here for tracker tips</A></Link>
					</Tips>
				</DesktopWrapper>
			);
		} else if (this.state.inBrowser && this.state.width < 1024) {
			content = (
				<Wrapper w_100 tc pa3>
					{this.state.showMap ? <Iframe raceID={this.props.raceID}/> : null}
					<Button dib w4 loading={false} onClick={this.toggleMap}>
						{this.state.showMap ? 'Hide map' : 'Show map'}
					</Button>
				</Wrapper>
			);
		}
		return content;
	}
}

MapContainer.propTypes = {
	raceID: PropTypes.string,
	offset: PropTypes.bool
};

MapContainer.defaultProps = {
	raceID: '',
	offset: false
};

export default MapContainer;
