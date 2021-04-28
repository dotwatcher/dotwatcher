import colors from "@Utils/colors";
import dim from "@Utils/dim";
import styled, { css } from "styled-components";
import fonts from "@Utils/fonts";

const Input = styled.input`
	background: transparent;
	border-radius: 2px;
	border: 1px solid ${colors.grey};
	min-height: ${dim(3)};
	padding: 0 ${dim()};
	font-family: ${fonts.primary};
	width: 100%;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
	appearance: none;
	background-color: transparent;
	height: ${dim()};
	width: ${dim()};
	position: relative;
	top: 2px;
	border-radius: 3px;
	border: 1px solid ${colors.black};

	${({ checked }) =>
		checked &&
		css`
			background-color: ${colors.black};
		`}

	&:hover {
		color: ${colors.primary};
		background-color: ${colors.primary};
	}
`;

export default Input;
