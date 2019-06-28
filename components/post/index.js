import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import slugify from '../../utils/slugify';
import Long from './post-long';
import Short from './post-short';
import Quote from './post-quote';
import Embed from './post-embed';
import Photo from './post-photo';
import Meta from './meta';
import EmailSignup from '../content-block/email-signup'
import { useCookies } from 'react-cookie';

const Article = styled.article`${tachyons}`;

const Post = ({ data, id, index }) => {
	const [cookies] = useCookies(['hideSignup']);
	let post;
	if (data.format === 'Long') {
		post = <Long key={id} id={id} data={data}/>;
	} else if (data.format === 'Quote') {
		post = <Quote key={id} id={id} data={data}/>;
	} else if (data.format === 'Embed') {
		post = <Embed key={id} id={id} data={data}/>;
	} else if (data.format === 'Photo') {
		post = <Photo key={id} id={id} data={data}/>;
	} else {
		post = <Short key={id} id={id} data={data}/>;
	}
	return (
		<React.Fragment>
			<Article bb bw1 b__light_gray f5 measure_wide mt3 mb5_l pb3 overflow_hidden id={slugify(data.title)} className="cf">
				{post}
				<Meta id={id} data={data}/>
			</Article>
			{ index === 0 && cookies.hideSignup === undefined ? <EmailSignup layout="small" /> : null }
		</React.Fragment>
	);
};

Post.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default Post;
