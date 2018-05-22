import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
import tachyons from 'styled-components-tachyons';
import moment from 'moment';
import Wrapper from '../shared/wrapper';
import {Link} from '../../routes';
import slugify from '../../utils/slugify';

const onAir = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
`;
const A = styled.a`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const H2Live = styled.h2`
	&:before {
		content: '';
		width: .75em;
		height: .75em;
		position: absolute;
		left: 1.25rem;
		margin: .625rem 0 0;
		border-radius: 100%;
		background-color: var(--red);
		animation: ${onAir} 2s linear infinite;
	}

	// &:after {
	// 	content: 'On air';
	// 	position: absolute;
	// 	top: 3.5rem;
	// 	left: .875rem;
	// 	font-size: .625rem;
	// 	letter-spacing: .1em;
	// 	width: 3rem;
	// 	text-align: center;
	// 	text-transform: uppercase;
	// }

	@media screen and (min-width: 60em) {
		&:before {
			left: .9rem;
			margin: .75rem 0;
		}
	}
${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const Span = styled.span`${tachyons}`;

const RacePromo = ({block, race}) => {
	const isRaceLive = moment().isBetween(moment(race.data.raceStartDate), moment(race.data.raceEndDate));
	const Title = isRaceLive ? <H2Live f2 f1_ns lh_title ma0 bt bw3 b__white pt2 pl5 near_black relative>{block.heading}</H2Live> : <H2 f2 f1_ns lh_title ma0 bt bw3 b__white pt2 pl5 near_black>{block.heading}</H2>;

	return (
		<Div mh4_m mh6_l mb4 mb5_ns className="cf">
			<Link route="race" params={{type: 'race', id: race.sys.id, raceID: race.data.raceID, slug: slugify(race.data.title)}} passHref prefetch>
				<A db cover bg_center style={{backgroundImage: `url(${block.image.fields.file.url})`}} className="cf">
					<Wrapper fr w_100 w_two_thirds_m w_50_l ph4 pv6 mv4 mv0_ns className="cf">
						<Div bg_white_50 pb3>
							{ Title }
							<P f3 lh_copy measure_narrow near_black ml5>
								{block.words}
							</P>
							<P f4	 ml5>
								<Span link underline near_black hover_white>
									{
										moment(race.data.raceEndDate).isBefore() ? `Look back at the race »` : `Follow the race »`
									}
								</Span>
							</P>
						</Div>
					</Wrapper>
				</A>
			</Link>
		</Div>
	);
};

RacePromo.propTypes = {
	block: PropTypes.object.isRequired,
	race: PropTypes.object
};

RacePromo.defaultProps = {
	race: {}
};

export default RacePromo;
