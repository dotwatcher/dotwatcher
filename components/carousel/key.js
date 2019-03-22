import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
import tachyons from 'styled-components-tachyons';
import moment from 'moment';
import widont from '../../utils/widont';
import Link from 'next/link';

const onAir = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
`;
const H2 = styled.h2`${tachyons}`;
const P = styled.p`${tachyons}`;
const A = styled.a`${tachyons}`;
const Span = styled.span`${tachyons}`;
const H2Live = styled.h2`
	&:before {
		content: '';
		width: .75em;
		height: .75em;
		position: absolute;
		left: -1.25rem;
		margin: .333rem 0 0;
		border-radius: 100%;
		background-color: var(--red);
		animation: ${onAir} 2s linear infinite;
	}

	@media screen and (min-width: 64em) {
		&:before {
			left: -1.5rem;
			margin: .375rem 0 0;
		}
	}
${tachyons}`;
const CarouselKey = ({slide, setActiveKey, activeKey}) => {
	const Div = styled.div`
		transition: transform 300ms ease-in-out;
		background-color: var(--${activeKey === slide.sys.id ? 'near-white' : 'white'});
		& + div {
			border-top-style: solid;
		}
		transform: ${activeKey === slide.sys.id ? 'translate(1rem, 0)' : 'translate(0px ,0px)' };
	${tachyons}`;
	const isRaceLive = slide.race ? moment().isBetween(moment(slide.race.fields.raceDate), moment(slide.race.fields.raceEndDate)) : false;
	const Title = isRaceLive ? <H2Live f4 f3_ns fw6 lh_title ma0 near_black relative>{widont(slide.heading)}</H2Live> : <H2 f4 f3_ns fw6 lh_title ma0 near_black>{widont(slide.heading)}</H2>;

	let cta;
	if (slide.race) {
		cta = <Link href={`/race?slug={slide.race.fields.slug}`} as={`/race/${slide.race.fields.slug}`} passHref prefetch>
			<A dib f6 f5_l mt2 mb0 no_underline>
				<Span near_black hover_blue bb bw1>
					{slide.callToAction ? slide.callToAction : 'Read more'} »
				</Span>
			</A>
		</Link>
	} else if (slide.feature) {
		cta = <Link href={`/feature?slug=${slide.feature}`} as={`/feature/${slide.feature}`} passHref prefetch>
			<A dib f6 f5_l mt2 mb0 no_underline>
				<Span near_black hover_blue bb bw1>
					{slide.callToAction ? slide.callToAction : 'Read more'} »
				</Span>
			</A>
		</Link>
	}

	return (
		<Div flex_auto pv4 pr3 pl4 db no_underline hover_bg_near_white bw1 b__white relative className="cf" onClick={setActiveKey}>
			{Title}
			<P f6 f5_l measure ma0 mt2 lh_copy near_black>
				{widont(slide.words)}
			</P>
			{cta}
		</Div>
	);
};

CarouselKey.propTypes = {
	slide: PropTypes.object.isRequired,
	setActiveKey: PropTypes.func.isRequired,
	activeKey: PropTypes.string.isRequired
};

export default CarouselKey;
