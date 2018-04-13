import React from 'react';
import PropTypes from 'prop-types';
import Long from './post-long';
import Short from './post-short';

const Post = ({data, id}) => {
	let post;
	if (data.format === 'Long') {
		post = <Long key={id} id={id} data={data}/>;
	} else {
		post = <Short key={id} id={id} data={data}/>;
	}
	return post;
};

Post.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default Post;
