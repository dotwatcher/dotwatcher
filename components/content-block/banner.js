import React from "react";
import PropTypes from "prop-types";
import Block from "./banner-block";
import styled, { css } from "styled-components";
import tachyons from "styled-components-tachyons";

const Grid = styled.div`
	@media screen and (min-width: 64em) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		${props =>
			props.count === 1 &&
			css`
				div:first-child {
					grid-column: 1 / span 3;
				}
			`}

		${props =>
			props.count > 2 &&
			css`
				div:nth-child(3) {
					grid-column: 1 / span 3;
				}
			`}
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
