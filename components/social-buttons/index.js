import {FacebookButton, TwitterButton} from 'react-social';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Div = styled.div`${tachyons}`;
const StyledFacebookButton = styled(FacebookButton)`
	display: inline-block;
	background-color: #3b5998;
	border: 0;
	color: #fff;
	font-size: 1rem;
	line-height: 1;
	padding: var(--spacing-small);
	margin: 0 var(--spacing-small) var(--spacing-small);
	cursor: pointer;
`;
const StyledTwitterButton = styled(TwitterButton)`
	display: inline-block;
	background-color: #00aced;
	border: 0;
	color: #fff;
	font-size: 1rem;
	line-height: 1;
	padding: var(--spacing-small);
	margin: 0 0 var(--spacing-small) var(--spacing-small);
	cursor: pointer;
`;

class SocialButtons extends Component {
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
		return (
			<Div fl w_two_thirds tr>
				<StyledFacebookButton
					url={this.props.url}
					appId="2041612559415974"
					windowOptions={[
						'status=0',
						'toolbar=0',
						'width=480',
						'height=350',
						`top=${this.state.inBrowser ? window.screen.height / 2 - 175 : 10}px`,
						`left=${this.state.inBrowser ? window.screen.width / 2 - 240 : 10}px`
					]}
				>
					{'Share'}
				</StyledFacebookButton>
				<StyledTwitterButton
					url={this.props.url}
					windowOptions={[
						'status=0',
						'toolbar=0',
						'width=480',
						'height=350',
						`top=${this.state.inBrowser ? window.screen.height / 2 - 175 : 10}px`,
						`left=${this.state.inBrowser ? window.screen.width / 2 - 240 : 10}px`
					]}
				>
					{'Tweet'}
				</StyledTwitterButton>
			</Div>
		);
	}
}

SocialButtons.propTypes = {
	url: PropTypes.string.isRequired
};

export default SocialButtons;
