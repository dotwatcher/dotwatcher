import Head from 'next/head'
import Header from '../components/header';
import Post from '../components/post';
import React from 'react';
import Wrapper from '../components/shared/wrapper';
import {withEntry} from '../data/with-entry';
class Race extends React.Component {
	render () {
		return <div>
			<Head>
				<title>{this.props.post.data.title}</title>
				<meta property="og:title" content={this.props.post.data.title} />
				<meta property="og:image" content="" />
			</Head>
			<Header
				title="dotwatcher.cc"
			/>
			<Wrapper>
				<Post key={this.props.post.sys.id} id={this.props.post.sys.id} data={this.props.post.data}/>
			</Wrapper>
		</div>
	}
}

export default withEntry(Race);
