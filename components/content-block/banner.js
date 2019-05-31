import React from 'react';
import PropTypes from 'prop-types';
import Block from "./banner-block";
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Banner = ({ blocks, count }) => {
  let template = '1fr';
  if (count > 1) {
    template = '1fr 1fr';
  }

  const Grid = styled.div`
    margin: 0 calc(var(--spacing-extra-small)/2) var(--spacing-large);

    @media screen and (min-width: 48em) {
      display: grid;
      grid-template-columns: ${template};
    }
  ${tachyons}`

  return (
      <Grid>
        {
          blocks.map((block, i) => {
            return <Block block={block} index={i} count={count}/>
          })
        }
      </Grid>
    )
};

Banner.propTypes = {
    blocks: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired
};

export default Banner;
