import { Link, Router } from '../../routes'
import Image from '../image';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown-with-shortcodes';
import SocialButtons from '../social-buttons';
import TimeAgo from 'react-timeago';
import Embed from '../embed';
import shortcodes from 'remark-shortcodes';
import slugify from '../../utils/slugify';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Article = styled.article`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;
const StyledTimeAgo = styled(TimeAgo)`
	float: left;
	width: 33%;
	font-size: 1rem;
	padding: var(--spacing-small) 0;
`;

const Post = ({data, id}) => {
	constructor: {
		const host = typeof window !== 'undefined' ? window.location.host : '';
		this.state = {
			url: `${host}/post/${id}?slug=${slugify(data.title)}`
		}
	}
	return (
		<Article bb bw1 f4 measure_wide mt4 pb2 id={slugify(data.title)} className="cf">
			{ data.image ? <Image data={data.image.fields}/> : null }
			<H1 f2 lh_title>
				<Link route="post" params={{type: 'post', id: id, slug: slugify(data.title)}} passHref prefetch>
					<A link dim near_black underline>{data.title}</A>
				</Link>
			</H1>
			<Div lh_copy pb3>
				<ReactMarkdown
					source={data.body}
					plugins={[shortcodes]}
					renderers={{shortcode: Embed}}
				/>
			</Div>
			<StyledTimeAgo date={data.date}>
				{data.date}
			</StyledTimeAgo>
			<SocialButtons url={this.state.url} />
			<Div fr f5 pv2>
				{
					data.categories.map(category => (
						<Link key={category.sys.id} route="race" params={{type: 'race', id: category.sys.id, slug: slugify(category.fields.title)}} passHref prefetch>
							<A link dim near_black underline>{category.fields.title}</A>
						</Link>
					))
				}
			</Div>
		</Article>
	);
};

Post.propTypes = {
	data: PropTypes.object.isRequired
};

export default Post;
