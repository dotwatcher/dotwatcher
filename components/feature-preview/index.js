import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';
import Placeholder from '../placeholder';
import widont from '../../utils/widont';

const A = styled.a`${tachyons}`;
const Div = styled.div`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;
const P = styled.p`${tachyons}`;

const FeaturePreview = ({data}) => {
	return (
		<Div className="with-divider cf">
			<Figure ma0 pa0 fl ph3 w_100 w_40_ns>
				<Link href={`/feature?slug=${data.slug}`} as={`/feature/${data.slug}`} passHref prefetch>
					<A db>
						{ data.image ? <Img db mw_100 src={`${data.image.fields.file.url}?w=600&h=600&fm=jpg&q=50`} alt={data.image.fields.description}/> : <Placeholder w_100 h_100 pv6 bg_light_gray/> }
					</A>
				</Link>
			</Figure>
			<Div fl_ns ph3 w_100 w_60_ns>
				<Link href={`/feature?slug=${data.slug}`} as={`/feature/${data.slug}`} passHref prefetch>
					<A link near_black>
						<H1 f2 fw6 ma0 lh_title link hover_blue>{widont(data.title)}</H1>
					</A>
				</Link>
				<P lh_copy f4>{widont(data.excerpt)}</P>
			</Div>
		</Div>
	);
};

FeaturePreview.propTypes = {
	data: PropTypes.object.isRequired
};

export default FeaturePreview;
