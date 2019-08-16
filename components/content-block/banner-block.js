import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import tachyons from 'styled-components-tachyons';
import moment from 'moment';
import Link from 'next/link';
import widont from '../../utils/widont';

const onAir = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
`;
const A = styled.a`
  background-color: var(--black);
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity : .8;
    background-image: url(${props => props.bg}?w=1200);
    background-size: cover;
    background-position: center;
    z-index: 1;
    @media screen and (min-width: 64em) {
      background-image: url(${props => props.bg}?w=1800);
    }
  }

  &:hover:before {
    opacity : .7;
  }
${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const H2Live = styled.h2`
  &:before {
    content: ' ';
    width: .75em;
    height: .75em;
    position: absolute;
    left: -2rem;
    margin: .625rem 0 0;
    border-radius: 100%;
    background-color: var(--red);
    animation: ${onAir} 2s linear infinite;
  }

  @media screen and (min-width: 48em) {
    &:before {
      left: -3rem;
      margin: .75rem 0;
    }
  }
${tachyons}`;
const P = styled.p`${tachyons}`;
const Span = styled.span`${tachyons}`;
const Div = styled.div`${tachyons}`;
const InfoWrap = styled.div`${tachyons}`;

const HomepagePrimary = ({ block, index, count }) => {
  let span = 'inherit';
  if (index === 0 && count === 3) {
    span = '1 / span 3'
  }
  const Race = styled.div`
    grid-column: ${span};
    margin: 0;

    &.primary {
      padding-top: var(--spacing-extra-extra-extra-large);

      @media screen and (min-width: 48em) {
        .infowrap {
          width: 66.666%;
        }
      }

      @media screen and (min-width: 64em) {
        .infowrap {
          width: 50%;
        }
      }
    }

    &.secondary {
      padding-top: var(--spacing-extra-large);
    }
  ${tachyons}`;

  if (block.race) {
    const isRaceLive = moment().isBetween(moment(block.race.fields.raceDate), moment(block.race.fields.raceEndDate));
    const Title = isRaceLive ? <H2Live f2 f1_ns fw6 lh_title ma0 bb bw2 b__white pb2 ml3 ml4_ns near_white relative mb3>{widont(block.heading)}</H2Live> : <H2 f2 f1_ns fw6 lh_title ma0 bb bw2 b__white pb2 ml4_ns near_white mb3>{widont(block.heading)}</H2>;
    const WordsWrap = styled.div`
      margin-left: var(--spacing-${isRaceLive ? 'medium' : 'none'});

      @media screen and (min-width: 48em) {
        margin-left: var(--spacing-large);
      }

      p {
        max-width: ${index === 0  ? '30em' : '20em'};
      }
    ${tachyons}`;

    const noun = block.race.fields.slug.includes('paris-brest') ? 'audax' : 'race';

    return (
      <Race relative bg_black z_0 className={`cf ${index === 0 && count % 2 ? 'primary' : 'secondary'}`}>
        <Link href={`/race?slug=${block.race.fields.slug}`} as={`/race/${block.race.fields.slug}`} passHref prefetch>
          <A link db bg={block.image.fields.file.url} className="cf">
            <InfoWrap pa4 pr5_ns relative z_2 className="infowrap cf">
              <Div>
                {Title}
                <WordsWrap>
                  <P f4 f3_ns lh_copy near_white>
                    {widont(block.words)}
                  </P>
                  <P f4 f3_ns pt3>
                    <Span link underline near_white hover_white>
                      {
                        moment(block.race.fields.raceEndDate).isBefore() ? `Look back at the ${noun} »` : `Follow the ${noun} »`
                      }
                    </Span>
                  </P>
                </WordsWrap>
              </Div>
            </InfoWrap>
          </A>
        </Link>
      </Race>
    );
  }
  if (block.feature) {
    return (
      <Div mh4_m mb4 mb5_ns className="cf">
        <Link href={`/feature?slug=${block.feature}`} as={`/feature/${block.feature}`} passHref prefetch>
          <A db cover bg_center bg={block.image.fields.file.url} className="cf">
            <Wrapper fr w_100 w_two_thirds_m w_50_l pa4 pv6_ns mv4 mv0_ns className="cf">
              <Div bg_white_50 pb3>
                <H2 f2 f1_ns lh_title ma0 bt bw3 b__white pt2 ph4 near_black mb3>
                  {block.heading}
                </H2>
                <WordsWrap>
                  <P f4 f3_ns lh_copy measure_narrow near_black>
                    {widont(block.words)}
                  </P>
                  <P f4 mt3>
                    <Span link underline near_black hover_white>
                      Read more »
                    </Span>
                  </P>
                </WordsWrap>
              </Div>
            </Wrapper>
          </A>
        </Link>
      </Div>
    );
  }
};

HomepagePrimary.propTypes = {
  block: PropTypes.object.isRequired
};

export default HomepagePrimary;
