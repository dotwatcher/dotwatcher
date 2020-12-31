import colors from "@Utils/colors";
import dim from "@Utils/dim";
import styled from "styled-components";
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

export default Input;
