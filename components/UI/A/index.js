import styled from "styled-components";
import colors from "@Utils/colors";

export default styled.a`
	font-size: inherit;
	margin-bottom: 0;
	cursor: pointer;

	color: ${colors.primary};
	text-decoration: none;
	border-bottom: 1px solid;
	padding-bottom: 0;

	&:hover {
		color: ${colors.primaryHover};
	}
`;
