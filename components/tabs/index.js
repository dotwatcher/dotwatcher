import React, {Component} from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Tabs = styled.ul`${tachyons}`;
const Tab = styled.li`${tachyons}`;

const TabbedNav = ({setActiveTabFeed, setActiveTabCommunity, activeTab, id}) => {

const FeedButton = styled.a`
	background-color: var(--${activeTab === 'feed' ? 'near-white' : 'white' });
${tachyons}`;
const CommunityButton = styled.a`
	display: ${id ? 'block' : 'none'};
	background-color: var(--${activeTab === 'community' ? 'near-white' : 'white' });
${tachyons}`;

	return (
		<Tabs list pa0 bb bw1 b__near_white>
			<Tab dib>
				<FeedButton onClick={setActiveTabFeed} db ttu tracked fw5 f6 pa2 mr3>
					Feed
				</FeedButton>
			</Tab>
			<Tab dib>
				<CommunityButton onClick={setActiveTabCommunity} ttu tracked fw5 f6 pa2 hover>
					Community
				</CommunityButton>
			</Tab>
		</Tabs>
	)
}

export default TabbedNav
