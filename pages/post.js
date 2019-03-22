import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Header from '../components/header';
import Link from 'next/link';
import Page from '../components/shared/page';
import SocialIcons from '../components/shared/social-icons';
import Post from '../components/post';
import {withEntry} from '../data/with-entry';
import MapContainer from '../components/map-container';

const PostWrapper = styled.div`
@media screen and (min-width: 64em) {
	margin-left: 40%;
}
${tachyons}`;
const P = styled.p`${tachyons}`;
const Span = styled.span`${tachyons}`;
const A = styled.a`${tachyons}`;

class PostPage extends React.Component {
	render() {
		return (
			<Page>
				<Head>
					<title>{this.props.posts[0].data.title}</title>
					<meta property="og:title" content={`${this.props.posts[0].data.title} – DotWatcher.cc`}/>
					<meta property="og:description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing."/>
					<meta property="og:image" content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"/>

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@dotwatcher" />
					<meta name="twitter:creator" content="@dotwatcher" />
					<meta name="twitter:title" content={`${this.props.posts[0].data.title} – DotWatcher.cc`} />
					<meta name="twitter:description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing." />
					<meta name="description" content="DotWatcher is here to showcase the best of long distance self-supported bike racing." />
					<script src="//www.instagram.com/embed.js" />
				</Head>
				<Header
					title="dotwatcher.cc"
					raceName={this.props.posts[0].data.categories.fields.title}
					race={this.props.posts[0].data.categories}
				/>
				<MapContainer raceID={this.props.posts[0].data.categories.fields.trackleadersRaceId} offset={true}/>
				<PostWrapper fl w_100 w_50_l pa4>
					<Link href={`/race?slug=${this.props.posts[0].data.categories.fields.slug}`} as={`/race/${this.props.posts[0].data.categories.fields.slug}`} passHref prefetch>
						<A near_black f6 href="#">« Back to {this.props.posts[0].data.categories.fields.title} feed</A>
					</Link>
					<Post key={this.props.posts[0].sys.id} id={this.props.posts[0].sys.id} data={this.props.posts[0].data}/>
					<P measure lh_copy f6 silver>
						If you would like to get in touch email us at <A link gray underline hover_blue href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</A>
					</P>
					<P measure f6 silver>
						<Span silver dib mr2 v_btm>Follow along at</Span> <SocialIcons size="1" colour="gray"/>
					</P>
				</PostWrapper>
			</Page>
		);
	}
}

PostPage.propTypes = {
	posts: PropTypes.array.isRequired
};

export default withEntry(PostPage);
