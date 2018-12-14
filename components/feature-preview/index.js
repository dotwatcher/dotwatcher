import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import {Link} from '../../routes';
import Placeholder from '../placeholder';
import widont from '../../utils/widont';
import ContentBlock from '../content-block';

const A = styled.a`${tachyons}`;
const Div = styled.div`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const H3 = styled.h3`${tachyons}`;
const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;
const Span = styled.span`${tachyons}`;
const P = styled.p`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Wrap = styled.dl`${tachyons}`;
const Label = styled.dt`${tachyons}`;
const Stat = styled.dt`${tachyons}`;

const FeaturePreview = ({data, id, slug}) => {
	return (
		<Div className="with-divider cf">
			<Figure ma0 pa0 fl ph3 w_40>
				<Link route="feature" params={{type: 'feature', id: slug}} passHref prefetch>
					<a>
						{ data.image ? <Img mw_100 srcSet={`${data.image.fields.file.url}?w=300&h=300&fm=jpg&q=50 768w, ${data.image.fields.file.url}?w=600&h=600&fm=jpg&q=50 769w`} src={`${data.image.fields.file.url}?w=600&h=600&fm=jpg&q=50`} alt={data.image.fields.description}/> : <Placeholder w_100 h_100 pv6 bg_light_gray/> }
					</a>
				</Link>
			</Figure>
			<Div fl_ns ph3 w_50_m w_60_l>
				<Link route="feature" params={{type: 'feature', id: slug}} passHref prefetch>
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
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default FeaturePreview;
