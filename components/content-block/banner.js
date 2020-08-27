import React from "react";
import PropTypes from "prop-types";
import Block from "./banner-block";
import styled, { css } from "styled-components";
import tachyons from "styled-components-tachyons";

const Grid = styled.div`
	@media screen and (min-width: 64em) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	${tachyons}
`;

const Banner = ({ blocks, count }) => {
	return (
		<Grid mb5>
			{blocks.map((block, i) => {
				return (
					<Block key={block.sys.id} block={block} index={i} count={count} />
				);
			})}
		</Grid>
	);
};

Banner.propTypes = {
	blocks: PropTypes.array.isRequired,
	count: PropTypes.number.isRequired
};

export default Banner;
