import React, {Component} from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const TabsWrap = styled.div`
	position: sticky;
	top: 0;
${tachyons}`;
const Tabs = styled.ul`
	list-style-type: none;
${tachyons}`;
const Tab = styled.li`${tachyons}`;
const Message = styled.p`
	cursor: pointer;
${tachyons}`;

const TabbedNav = ({setActiveTabFeed, setActiveTabCommunity, activeTab, count, promo}) => {

const FeedButton = styled.a`
	background-color: var(--${activeTab === 'feed' ? 'light-gray' : 'white' });
	cursor: pointer;
${tachyons}`;
const CommunityButton = styled.a`
	background-color: var(--${activeTab === 'community' ? 'light-gray' : 'white' });
	cursor: pointer;
${tachyons}`;
const Count = styled.span`
	min-width: 1rem;
	border: 1px solid var(--light-blue);
	margin: -1px 0;
	padding: ${count < 10 ? '0' : '0 .25rem'};
	border-radius: ${count < 10 ? '100%' : '9999px'};
	box-sizing: content-box!important;
${tachyons}`;

	return (
		<TabsWrap bg_white>
			<Tabs pa0 ma0 bb bw1 b__light_gray>
				<Tab dib>
					<FeedButton onClick={setActiveTabFeed} db ttu tracked fw5 f6 pa2 mr3 hover_bg_near_white>
						Feed
					</FeedButton>
				</Tab>
				<Tab dib>
					<CommunityButton onClick={setActiveTabCommunity} db ttu tracked fw5 f6 pa2 hover_bg_near_white>
						Chat {count ? <Count dib h1 tc f6 fw4 white className="bg-gradient-blue">{count}</Count> : null}
					</CommunityButton>
				</Tab>
			</Tabs>
			{ promo ? <Message onClick={setActiveTabCommunity} relative bb b__light_gray f6 ma0 ph2 blue pv3 hover_bg_near_white>
				💬 {promo}
			</Message>
			: null }
		</TabsWrap>
	)
}

export default TabbedNav
