import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const H2 = styled.h2`${tachyons}`;
const P = styled.p`${tachyons}`;
const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

const Contribute = () => {
  return (
    <Div mt5 bt bw1 b__light_gray>
      <H2 f4 f3_l lh_title mb2 fw5>Become a DotWatcher contributor</H2>
      <P lh_copy f5 measure ma0>
        Do you have stories, photos, or insight that would be at home on DotWatcher? Drop us a line at <A link near_black hover_blue underline href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</A>, or find us on <A link near_black hover_blue underline href="https://twitter.com/dotwatcher">Twitter</A> and <A link near_black hover_blue underline href="https://www.instagram.com/dotwatcher.cc/">Instagram</A>.
      </P>
    </Div>
  )
}

export default Contribute;
