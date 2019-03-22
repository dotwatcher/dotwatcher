import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import DateTime from '../datetime';
import Link from 'next/link';
import SocialButtons from '../social-buttons';
import slugify from '../../utils/slugify';

const A = styled.a`${tachyons}`;

const Meta = ({data, id}) => {
	const host = typeof window !== 'undefined' ? window.location.host : '';
	const url = `${host}/post/${id}?slug=${slugify(data.title)}`;
	return (
		<React.Fragment>
			<Link href={`/post?id=${id}`} as={`/post/${id}`} passHref prefetch>
				<A link near_black hover_blue>
					<DateTime datetime={data.date}/>
				</A>
			</Link>
			<SocialButtons url={url}/>
		</React.Fragment>
	);
};

Meta.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default Meta;
