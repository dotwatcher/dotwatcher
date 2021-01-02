import colors from "@Utils/colors";
import dim from "@Utils/dim";
import fonts from "@Utils/fonts";
import styled from "styled-components";

const Button = styled.button`
	background-color: ${({ secondary }) =>
		secondary ? "transparent" : colors.primary};
	border-radius: 2px;
	min-width: ${dim(2)};
	appearance: none;
	color: ${({ secondary }) => (secondary ? colors.primary : "white")};
	border: none;
	min-height: ${dim(3)};
	padding: 0 ${dim(2)};
	border: 1px solid ${colors.primary};
	cursor: pointer;
	text-transform: uppercase;
	font-family: ${fonts.primary};

	&:hover {
		color: ${({ secondary }) => (secondary ? "red" : colors.primary)};
		border-color: ${({ secondary }) => (secondary ? "red" : colors.primary)};
		background-color: transparent;
	}
`;

export default Button;
