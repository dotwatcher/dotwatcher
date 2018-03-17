import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import TimeAgo from 'react-timeago';
import shortcodes from 'remark-shortcodes';
import Tweet from '../tweet';

const Article = styled.article`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Div = styled.div`${tachyons}`;
const StyledTimeAgo = styled(TimeAgo)`
	display: inline-block;
	margin-bottom: var(--spacing-small);
	font-size: 1rem;
	font-style: italic;
`;

const Post = ({data}) => {
// var tree = unified()
//   .use(parse)
//   .use(shortcodes)
//   .parse(data.body);
// 	console.log(tree, {depth: null});

	return (
		<Article bb bw1 f4 measure_wide>
			<H1 f2 lh_title><Link href={'race?id=' + data.slug} as={'/race/' + data.slug}><a>{data.title}</a></Link></H1>
			<Div lh_copy>
				<ReactMarkdown
					source={data.body}
					plugins={[shortcodes]}
					renderers={{shortcode: Tweet}}
				/>
			</Div>
			<StyledTimeAgo date={data.date} >
				{data.date}
			</StyledTimeAgo>
		</Article>
	);
};

Post.propTypes = {
	data: PropTypes.object.isRequired
};

export default Post;
