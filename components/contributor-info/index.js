'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';

const ContributorWrap = styled.aside`${tachyons}`;
const Contributor = styled.div`
  &:hover {
    background-color: var(--lightest-blue)
  }
${tachyons}`;
const Header = styled.header`${tachyons}`;
const A = styled.a`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const H4 = styled.h4`${tachyons}`;
const Figure = styled.figure`
  margin: 0 1rem 0 -1.5rem;

  @media screen and (min-width: 48em) {
    margin-right: 0 1rem 0 -2rem;
  }
${tachyons}`;
const Img = styled.img`${tachyons}`;

const ContributorInfo = ({ contributor }) => {
  return (
    <ContributorWrap mh3 mh6_ns>
      <Contributor f4 mt4 mh3 bg_near_white measure>
        <Link href={`/contributor?name=${contributor.slug}`} as={`/contributor/${contributor.slug}`} passHref >
          <A db link near_black>
            <Figure w3 dib v_mid>
              <Img img db bg_light_gray br_100
                title={contributor.avatar.fields.title}
                alt={contributor.avatar.fields.description}
                src={`${contributor.avatar.fields.file.url}?w=96&h=96&fit=fill&fm=jpg&q=80`}
              />
            </Figure>
            <Header dib v_mid>
              <H4 f6 ttu tracked fw5 ma0 gray>Feature by</H4>
              <H2 f4 fw5 ma0>{contributor.name}</H2>
            </Header>
          </A>
        </Link>
      </Contributor>
    </ContributorWrap>
  )
}

ContributorInfo.propTypes = {
  contributor: PropTypes.object
};

export default ContributorInfo
