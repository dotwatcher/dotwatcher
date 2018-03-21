import { FacebookButton, TwitterButton } from 'react-social';
import React, {Component} from 'react';

import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const StyledFacebookButton = styled(FacebookButton)`
	background-color: #3b5998;
	border: 0;
	color: #fff;
`;
const StyledTwitterButton = styled(TwitterButton)`
	background-color: #00aced;
	border: 0;
	color: #fff;
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
			<div>
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
			</div>
		);
	}
}

export default SocialButtons;
