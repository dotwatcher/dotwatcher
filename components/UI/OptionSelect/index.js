import styled from "styled-components";
import colors from "@Utils/colors";
import fonts from "@Utils/fonts";

const Select = styled.select`
	appearance: none;
	border: 1px solid ${colors.lightgrey};
	padding: 7.5px 15px;
	min-width: 250px;
	font-family: ${fonts.primary};
	background-image: url("/static/icons/option-select-arrows.svg");
	background-repeat: no-repeat;
	background-position: 95% 50%;
`;

export default Select;
