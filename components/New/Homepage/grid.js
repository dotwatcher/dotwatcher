import styled from "styled-components";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import colors from "@Utils/colors";

export const Grid = styled.section`
	display: grid;
	grid-column-gap: ${dim(2)};
	max-width: 2000px;
	margin: 0 auto;

	${mq.smUp`
		grid-template-columns: repeat(2, 1fr);
	`}

	${mq.mdUp`
		grid-template-columns: repeat(4, 1fr);
	`}
`;

export const GridItem = styled.article`
	& + & {
		${mq.smDown`
			margin-top: ${dim()};
			padding-top: ${dim()};
			border-top: 1px solid ${colors.lightgrey};
		`}
	}
`;
