import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown-with-shortcodes';
import TimeAgo from 'react-timeago';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../embed';
import Image from '../image';
import {Link} from '../../routes';
import slugify from '../../utils/slugify';
import SocialButtons from '../social-buttons';

const Article = styled.article`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;
const StyledTimeAgo = styled(TimeAgo)`
	float: left;
	width: 33%;
	font-size: 1rem;
	padding: var(--spacing-small) 0;
	text-decoration: underline;
`;

const Long = ({data, id}) => {
	constructor: {
		const host = typeof window !== 'undefined' ? window.location.host : '';
		this.state = {
			url: `${host}/post/${id}?slug=${slugify(data.title)}`,
		};
	}
	return (
		<Article bb bw1 f5 measure_wide mt4 pb2 id={slugify(data.title)} className="cf">
			{ data.image ? <Image data={data.image.fields}/> : null }
			<H1 f2 lh_title>
				<Link route="post" params={{type: 'post', id, slug: slugify(data.title)}} passHref prefetch>
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
			<Link route="post" params={{type: 'post', id, slug: slugify(data.title)}} passHref prefetch>
				<A link near_black>
					<StyledTimeAgo date={data.date}>
						{data.date}
					</StyledTimeAgo>
				</A>
			</Link>
			<SocialButtons url={this.state.url}/>
		</Article>
	);
};
Long.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default Long;
