import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';

const Div = styled.div`${tachyons}`;
const Header = styled.header`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const A = styled.a`${tachyons}`;
const Years = styled.ul`
  display: grid;
	grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
${tachyons}`;
const Year = styled.li`
  &:only-child {
    width: 33%;
  }
${tachyons}`;

const ResultsSummary = ({ event }) => {
  return (
    <Div>
      <Header mv3 pb1 bb bw1 b__light_gray>
        <H2 ma0 f3 fw6>{ event.Event }</H2>
      </Header>
      <Years list ma0 pa0 tc>
        {
          event.Year.map((year, index) => {
            return (
              <Year dib hover_bg_lightest_blue bg_light_gray ba bw1 b__white f4 lh_copy key={index}>
                <Link href={`/results?year=${year}&race=${event.Event}`} as={`/results/${year}/${event.Event}`} passHref prefetch>
                  <A db pa2 link near_black>
                    {year}
                  </A>
                </Link>
              </Year>
            )
          })
        }
      </Years>
    </Div>
  );
};

ResultsSummary.propTypes = {
  event: PropTypes.object.isRequired
};

export default ResultsSummary;
