import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';
import Contribute from './contribute';

const Div = styled.div`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const H4 = styled.h4`${tachyons}`;
const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;
const A = styled.a`${tachyons}`;
const Wrap = styled.div`
  margin: 0 var(--spacing-medium);
  @media screen and (min-width: 48em) {
    margin: 0 var(--spacing-extra-large) var(--spacing-large);
  }
${tachyons}`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: var(--spacing-large);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) );
${tachyons}`

const ContributorsGrid = ({ contributors }) => {
  return (
    <Wrap margin className="cf">
      <H2 f2 fw6>Our Contributors</H2>
      <Grid>
        {
          contributors.map(contributor => {
            return (
              <Div>
                <Link href={`/contributor?name=${contributor.slug}`} as={`/contributor/${contributor.slug}`} passHref >
                  <A db link near_black hover_blue dim>
                    <Figure ma0 pa0>
                      <Img mw_100 bg_light_gray src={`${contributor.avatar.fields.file.url}?w=400&h=400&fit=fill&fm=jpg&q=60&r=max`} />
                    </Figure>
                    <H4 fw6 tc mt2 mb0>{contributor.name}</H4>
                  </A>
                </Link>
              </Div>
            )
          })
        }
      </Grid>
      <Contribute/>
    </Wrap>
  );
};

ContributorsGrid.propTypes = {
  contributors: PropTypes.array.isRequired,
};

export default ContributorsGrid;
