import Head from 'next/head';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import React from 'react';
import {createClient} from 'contentful';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Button from '../components/shared/button';
import SocialIcons from '../components/shared/social-icons';
import Header from '../components/header';
import KeyEvents from '../components/key-events';
import MapContainer from '../components/map-container';
import Page from '../components/shared/page';
import Post from '../components/post';
import TopRiders from '../components/top-riders';
import FactFile from '../components/fact-file';
import Tabs from '../components/tabs';
import Community from '../components/community'
import Wrapper from '../components/shared/wrapper';
import vars from '../data/api-vars';
import {WithEntries} from '../data/with-entries';

const H1 = styled.h1`${tachyons}`;
const P = styled.p`${tachyons}`;
const Span = styled.span`${tachyons}`;
const A = styled.a`${tachyons}`;
const KeyEventsWrapper = styled.div`
@media screen and (max-width: 30em) {
	&:after {
		content: '';
		border-top: .125rem solid var(--light-gray);
		position: absolute;
		width: calc(100% - 2 * var(--spacing-medium));
		bottom: 0;
		left: var(--spacing-medium);
		height: var(--spacing-medium);
	}
}

@media screen and (min-width: 64em) {
	margin-left: 40%;
}
${tachyons}`;
const Notification = styled(Button)`
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	@media screen and (min-width: 48em) {
		top: inherit;
	}
	@media screen and (min-width: 64em) {
		left: 80%;
	}
`;

// Pusher.logToConsole = true;
const pusher = new Pusher(process.env.PUSHER_KEY, {
	cluster: 'eu',
	encrypted: true
});
const channel = pusher.subscribe('dotwatcher');

class Race extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			skip: 5,
			loading: false,
			newPost: false,
			newPostIDs: [],
			activeTab: 'feed'
		};

		this.setActiveTab = this.setActiveTab.bind(this);
	}

	setActiveTab(tab) {
		this.setState({
			activeTab: tab
		});
	}

	async fetchPosts(id) {
		this.setState({loading: true});
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const response = await client.getEntries({'sys.id': id});

		for (const item of response.items) {
			const entry = {
				sys: {
					id: item.sys.id
				},
				data: {
					title: item.fields.title,
					format: item.fields.format,
					slug: item.fields.slug,
					date: item.sys.createdAt,
					body: item.fields.body,
					categories: item.fields.category,
					keyEvent: item.fields.keyPost,
					embed: item.fields.embed
				}
			};

			if (item.fields.featuredImage) {
				entry.data.image = response.includes.Asset.find(obj => {
					return obj.sys.id === item.fields.featuredImage.sys.id;
				});
			}

			this.props.posts.unshift(entry);
		}
		await this.setState({
			loading: false
		});
	}

	componentDidMount() {
		if (location.hash === '#chat') {
			this.setActiveTab('community')
		}

		channel.bind('new-post', newPostEvent => {
			const isNewPost = this.props.posts.find(obj => {
				return obj.sys.id === newPostEvent.post;
			}) === undefined;

			if (newPostEvent.category === this.props.raceID && isNewPost ) {
				this.setState({
					newPost: true,
					newPostIDs: [newPostEvent.post, ...this.state.newPostIDs]
				});
			}
		});
	}

	showNextPageOfPosts() {
		this.setState(
			prevState => ({...prevState, skip: this.state.skip + 5})
		);
	}

	loadPost() {
		this.state.newPostIDs.forEach(postID => {
			this.fetchPosts(postID);
		});
		this.setState({
			newPost: false,
			newPostIDs: []
		});
	}

	render() {
		const Feed = styled.div`
			display: ${this.state.activeTab === 'feed' ? 'block' : 'none' };
		${tachyons}`;
		const CommunityWrap = styled.div`
			display: ${this.state.activeTab === 'community' ? 'block' : 'none' };
		${tachyons}`;

		const morePostsButton = (
			<Button db w5 loading={this.state.loading} onClick={this.showNextPageOfPosts.bind(this)}>
				{
					this.state.loading ? 'Loading...' : 'Load more posts'
				}
			</Button>
		);

		let morePosts = null;
		if (this.props.totalPosts > this.state.skip) {
			morePosts = morePostsButton;
		} else if (this.props.posts.length === 0) {
			morePosts = null;
		} else {
			morePosts = <H1 mt3 tc moon_gray tracked ttu i>Fin</H1>;
		}

		let newPostsNotification = null;
		const updateMessageQualifier = this.state.newPostIDs.length > 1 ? 'updates' : 'update';
		if (this.state.newPost) {
			newPostsNotification = (
				<Notification fixed z_1 loading={this.state.loading} onClick={this.loadPost.bind(this)} href="#posts">
					{
						this.state.loading ? `Loading...` : `${this.state.newPostIDs.length} new ${updateMessageQualifier}`
					}
				</Notification>
			);
		}

		return (
			<Page>
				<Head>
					<title>{this.props.raceName} – DotWatcher.cc</title>
					<meta property="og:title" content={`${this.props.raceName} – DotWatcher.cc`}/>
					<meta property="og:description" content={this.props.race.fields.shortDescription ? this.props.race.fields.shortDescription : 'DotWatcher is here to showcase the best of long distance self-supported bike racing.' }/>
					<meta property="og:image" content={this.props.raceImage}/>
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="@dotwatcher"/>
					<meta name="twitter:creator" content="@dotwatcher"/>
					<meta name="twitter:title" content={`${this.props.raceName} – DotWatcher.cc`}/>
					<meta name="twitter:description" content={this.props.race.fields.shortDescription ? this.props.race.fields.shortDescription : 'DotWatcher is here to showcase the best of long distance self-supported bike racing.'} />
					<meta name="twitter:image" content={this.props.raceImage} />
					<meta name="description" content={this.props.race.fields.shortDescription ? this.props.race.fields.shortDescription : 'DotWatcher is here to showcase the best of long distance self-supported bike racing.' } />
					<meta name="twitter:label1" content="Location" /><meta name="twitter:data1" content={this.props.race.fields.location} />
					<meta name="twitter:label2" content="Length" /><meta name="twitter:data2" content={this.props.race.fields.length} />
					<script src="//www.instagram.com/embed.js" />
				</Head>
				<Header
					title="dotwatcher.cc"
					raceName={this.props.raceName}
					race={this.props.race}
				/>
				<MapContainer raceID={this.props.trackleadersID}/>
				<KeyEventsWrapper fl ph3 ph4_ns pb2 w_100 w_30_m w_20_l mt4_l relative id="events-wrap">
					<TopRiders race={this.props.race}/>
					<FactFile race={this.props.race}/>
					<KeyEvents posts={this.props.posts} skip={this.state.skip}/>
				</KeyEventsWrapper>
				<Wrapper ph3 pb2 w_100 w_70_m w_40_l>
					{
						this.props.race.fields.discourseId && this.props.replies ?
						(
							<React.Fragment>
								<Tabs setActiveTabFeed={() => this.setActiveTab('feed')} setActiveTabCommunity={() => this.setActiveTab('community')} activeTab={this.state.activeTab} count={this.props.replies} promo={this.props.race.fields.chatPromo}/>
								<CommunityWrap>
									<Community id={this.props.race.fields.discourseId} active={this.state.activeTab === 'community'} />
								</CommunityWrap>
							</React.Fragment>
						) : null
					}
					<Feed id="posts">
						{ newPostsNotification }
						{
							this.props.posts.map((item, index) => {
								if (index <= this.state.skip) {
									return (
										<Post key={item.sys.id} id={item.sys.id} data={item.data}/>
										)
								}
							})
						}
						{ morePosts }
						<P measure lh_copy f6 silver>
							If you would like to get in touch email us at <A link gray underline hover_blue href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</A>
						</P>
						<P measure f6 silver>
							<Span silver dib mr2 v_btm>Follow along at</Span> <SocialIcons size="1" colour="gray"/>
						</P>
					</Feed>
				</Wrapper>
			</Page>
		);
	}
}

Race.propTypes = {
	posts: PropTypes.array.isRequired,
	totalPosts: PropTypes.number.isRequired,
	trackleadersID: PropTypes.string.isRequired,
	raceName: PropTypes.string.isRequired,
	raceID: PropTypes.string.isRequired,
	race: PropTypes.object.isRequired,
	raceImage: PropTypes.string.isRequired
};

export default WithEntries(Race);
