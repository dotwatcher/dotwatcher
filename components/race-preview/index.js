import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import {Link} from '../../routes';
import slugify from '../../utils/slugify';
import Placeholder from '../placeholder';

const A = styled.a`${tachyons}`;
const Div = styled.div`${tachyons}`;
const H1 = styled.h1`${tachyons}`;
const H3 = styled.h3`${tachyons}`;
const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;
const Span = styled.span`${tachyons}`;
const P = styled.p`${tachyons}`;

const RacePreview = ({data, id}) => {
	return (
		<Div mb4 className="cf">
			<Figure ma0 pa0 fl ph3 w_40>
				{ data.icon ? <Img mw_100 src={data.icon.fields.file.url} alt={data.icon.fields.description}/> : <Placeholder w_100 h_100 pv6 bg_light_gray/> }
			</Figure>
			<Div fl ph3 w_60>
				<H1 f3 ma0 lh_title>{data.title}</H1>
				<H3 ma0 mt2 f6 fw4><Span fw6>Start:</Span> {moment(data.raceDate).format('LLLL')}</H3>
				<P lh_copy>{data.description}</P>
				<Link route="race" params={{type: 'race', id, raceID: data.raceID, slug: slugify(data.title)}} passHref prefetch>
					<A link dim near_black underline>
						Follow the race {data.raceID}
					</A>
				</Link>
			</Div>
		</Div>
	);
};

RacePreview.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default RacePreview;
