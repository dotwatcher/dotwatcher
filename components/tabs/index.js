import React, {Component} from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Tabs = styled.ul`
	position: sticky;
	top: 0;
	list-style-type: none;
${tachyons}`;
const Tab = styled.li`${tachyons}`;

const TabbedNav = ({setActiveTabFeed, setActiveTabCommunity, activeTab, id}) => {

const FeedButton = styled.a`
	background-color: var(--${activeTab === 'feed' ? 'light-gray' : 'white' });
${tachyons}`;
const CommunityButton = styled.a`
	display: ${id ? 'block' : 'none'};
	background-color: var(--${activeTab === 'community' ? 'light-gray' : 'white' });
${tachyons}`;

	return (
		<Tabs pa0 bb bw1 bg_white b__light_gray>
			<Tab dib>
				<FeedButton onClick={setActiveTabFeed} db ttu tracked fw5 f6 pa2 mr3 hover_bg_near_white>
					Feed
				</FeedButton>
			</Tab>
			<Tab dib>
				<CommunityButton onClick={setActiveTabCommunity} ttu tracked fw5 f6 pa2 hover_bg_near_white>
					Community
				</CommunityButton>
			</Tab>
		</Tabs>
	)
}

export default TabbedNav
