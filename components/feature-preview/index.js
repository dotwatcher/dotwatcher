import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';
import Placeholder from '../placeholder';
import widont from '../../utils/widont';
import { CommentCount } from 'disqus-react';
import Image from '../NextImage'

const A = styled.a`${tachyons}`;
const Div = styled.div`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;
const P = styled.p`${tachyons}`;

const FeaturePreview = ( {data = {}, id }) => {
	const disqusShortname = 'dotwatcher';
	const disqusConfig = {
		url: `https://dotwatcher.cc/feature/${data.slug}`,
		identifier: id,
		title: data.title,
	};
	return (
		<Div className="with-divider cf">
			<Figure ma0 pa0 fl ph3 w_100 w_40_ns>
				<Link href={`/feature/${data.slug}`} passHref>
					<A db>
						{ data.image ? <Image width={380} height={250} src={data.image.fields.file.url} alt={data.image.fields.description}/> : <Placeholder w_100 h_100 pv6 bg_light_gray/> }
					</A>
				</Link>
			</Figure>
			<Div fl_ns ph3 w_100 w_60_ns>
				<Link href={`/feature/${data.slug}`} passHref>
					<A link near_black>
						<H1 f2 fw6 ma0 lh_title link hover_blue>{widont(data.title)}</H1>
					</A>
				</Link>
				<P lh_copy f4>{widont(data.excerpt)}</P>
				{
					data.comments ? <Link href={`/feature/${data.slug}#comments`} passHref>
						<A link near_black underline hover_blue>
							<CommentCount shortname={disqusShortname} config={disqusConfig}>
								0 Comments
							</CommentCount>
						</A>
					</Link> : null
				}
			</Div>
		</Div>
	);
};

FeaturePreview.propTypes = {
	data: PropTypes.object.isRequired
};

export default FeaturePreview;
