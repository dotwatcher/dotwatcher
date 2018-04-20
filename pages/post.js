import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Page from '../components/shared/page';
import Post from '../components/post';
import Wrapper from '../components/shared/wrapper';
import {withEntries} from '../data/with-entries';

class PostPage extends React.Component {
	render() {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title>{this.props.posts[0].data.title}</title>
					<meta property="og:title" content={this.props.posts[0].data.title} />
					<meta property="og:image" content="" />
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				<Wrapper w_50 pa4>
					<Post key={this.props.posts[0].sys.id} id={this.props.posts[0].sys.id} data={this.props.posts[0].data}/>
				</Wrapper>
			</Page>
		);
	}
}

PostPage.propTypes = {
	posts: PropTypes.array.isRequired
};

export default withEntries(PostPage);
