import { FacebookButton, TwitterButton } from 'react-social';
import React, {Component} from 'react';

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
`;
const StyledTwitterButton = styled(TwitterButton)`
	display: inline-block;
	background-color: #00aced;
	border: 0;
	color: #fff;
	font-size: 1rem;
	line-height: 1;
	padding: var(--spacing-small);
	margin: 0 var(--spacing-small) var(--spacing-small);
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
			<Div fl w_third tc>
				<StyledFacebookButton
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

export default SocialButtons;
