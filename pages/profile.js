import Head from 'next/head';
import Header from '../components/header';
import { Link, Router } from '../routes'
import Page from '../components/shared/page';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../components/shared/wrapper';
import slugify from '../utils/slugify';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import {withProfile} from '../data/with-profile';

const Img = styled.img`${tachyons}`;
const A = styled.a`${tachyons}`;

class Profile extends React.Component {
	render () {
		return (
			<Page sans_serif near_black pa0 ma0>
				<Head>
					<title></title>
					<meta property="og:title" content="" />
					<meta property="og:image" content="" />
				</Head>
				<Header
					title="dotwatcher.cc"
				/>
				{!this.props.profile &&
					<Wrapper w_100 w_20_ns mt4>
						User not found
					</Wrapper>
				}
				{this.props.profile &&
					<div>
						{this.props.profile.data.profilePhoto &&
							<Wrapper w_100 w_20_ns mt4>
								<Img img db src={this.props.profile.data.profilePhoto.fields.file.url}/>
							</Wrapper>
						}
						<Wrapper w_100 w_40_ns mt4>
							<h1>{this.props.profile.data.name}</h1>
							{this.props.profile.data.biography}
							{this.props.profile.data.twitterUsername &&
								<a href={`http://twitter.com/${this.props.profile.data.twitterUsername}`}>
									Twitter
								</a>
							}
							{this.props.profile.data.instagramUsername &&
								<a href={`http://instagram.com/${this.props.profile.data.instagramUsername}`}>
									Instagram
								</a>
							}
							<br/>Races done:
							{
								this.props.profile.data.categories.map(category => (
									<Link key={category.sys.id} route="race" params={{type: 'race', id: category.sys.id, slug: slugify(category.fields.title)}} passHref prefetch>
										<A link dim near_black underline>{category.fields.title}</A>
									</Link>
								))
							}
						</Wrapper>
					</div>
				}
			</Page>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default withProfile(Profile);
