import React from 'react';

import Head from 'next/head';
import find from 'lodash/find';
import {withRouter} from 'next/router'
import {createClient} from 'contentful';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

import Header from '../components/header';
import KeyEvents from '../components/key-events';
import TopRiders from '../components/top-riders';
import MapContainer from '../components/map-container';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import vars from '../data/api-vars';

const H1 = styled.h1`${tachyons}`;
const KeyEventsWrapper = styled.div`
@media screen and (min-width: 60em) {
	margin-left: 40%;
}
${tachyons}`;

class Race extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			skip: 0,
			total_posts: 0,
			loading: true
		};
	}

	async fetchPosts(skip) {
		this.setState({loading: true})
		const client = createClient({
			space: vars.space,
			accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
		});

		const contenfulQuery = {
			content_type: vars.contentTypes.posts, // eslint-disable-line camelcase
			'fields.category.sys.id': this.props.router.query.id,
			order: '-sys.createdAt',
			limit: 5,
			skip: this.state.skip
		};

		const response = await client.getEntries(contenfulQuery);
		const newPosts = [];
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
				entry.data.image = find(response.includes.Asset, obj => {
					return obj.sys.id === item.fields.featuredImage.sys.id;
				});
			}
			newPosts.push(entry);
		}
		await this.setState({
			posts: [...this.state.posts, ...newPosts],
			total_posts: response.total,
			loading: false
		});
	}

	componentDidMount() {
		this.fetchPosts(this.state.skip)
	}

	loadMore() {
		this.setState(
			prevState => ({...prevState, skip: this.state.skip + 5}),
			() => (this.fetchPosts(this.state.skip))
		);
	}

	render() {
		let raceName;
		let raceID;
		let trackleadersID;
		if (this.state.posts.length) {
			raceName = this.state.posts[0].data.categories[0].fields.title
			raceID = this.state.posts[0].data.categories[0].sys.id
			trackleadersID = this.state.posts[0].data.categories[0].fields.trackleadersRaceId
		}

		const Toggle = styled.a`
			background-color: var(--${this.state.loading ? 'gray' : 'blue'});
			&:hover {
				background-color: var(--${this.state.loading ? 'gray' : 'light-blue'});
			}
		${tachyons}`;

		const morePostsButton = (
			<Toggle f6 link dim br2 ph3 pv2 mv4 db w5 center tc white tracked ttu onClick={this.loadMore.bind(this)}>
				{
					this.state.loading ? 'Loading...' : 'Load more posts'
				}
			</Toggle>
		)

		let morePosts = null
		if (this.state.total_posts > this.state.posts.length) {
			morePosts = morePostsButton
		} else if (this.state.posts.length === 0) {
			morePosts = null
		} else {
			morePosts = <H1 mt3 tc moon_gray tracked ttu i>Fin</H1>
		}

		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>{raceName} – dotwatcher.cc</title>
					<meta property="og:title" content={`${raceName} – dotwatcher.cc`}/>
					<meta property="og:image" content=""/>
				</Head>
				<Header
					title="dotwatcher.cc"
					raceName={raceName}
				/>
				<MapContainer raceID={trackleadersID}/>
				<KeyEventsWrapper fl ph3 ph4_ns pb2 w_100 w_30_m w_20_l mt4_l>
					<TopRiders raceID={raceID}/>
					<KeyEvents posts={this.state.posts}/>
				</KeyEventsWrapper>
				<Wrapper ph3 pb2 w_100 w_70_m w_40_l mt4_l>
					{
						this.state.posts.length ? this.state.posts.map(item => (
							<Post key={item.sys.id} id={item.sys.id} data={item.data}/>
						)) : null
					}
					{ morePosts }
				</Wrapper>
			</Page>
		);
	}
}

export default withRouter(Race);
