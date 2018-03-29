import { Link, Router } from '../../routes'
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SocialButtons from '../social-buttons';
import TimeAgo from 'react-timeago';
import Tweet from '../tweet';
import Image from '../image';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Article = styled.article`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;
const StyledTimeAgo = styled(TimeAgo)`
	display: inline-block;
	margin-bottom: var(--spacing-small);
	font-size: 1rem;
	font-style: italic;
`;

const Post = ({data, id}) => {
	return (
		<Article bb bw1 f4 measure_wide mt4>
			{ data.image ? <Image data={data.image.fields}/> : null }
			<H1 f2 lh_title>
				<Link route="post" params={{id: id, type: 'post'}}>
					<A link dim near_black underline>{data.title}</A>
				</Link>
			</H1>
			<Div lh_copy>
				<ReactMarkdown
					source={data.body}
					plugins={[shortcodes]}
					renderers={{shortcode: Tweet}}
				/>
			</Div>
			<SocialButtons />
			<StyledTimeAgo date={data.date}>
				{data.date}
			</StyledTimeAgo>
			<Div>
				Race: {
					data.categories.map(category => (
						<Link key={category.sys.id} route="race" params={{id: category.sys.id, type: 'race'}}>
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
