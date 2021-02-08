import styled from "styled-components";
import colors from "@Utils/colors";
import mq from "@Utils/media-query";

const ReturnToTop = styled.button`
	display: none;
	background: white;
	border: 1px solid ${colors.lightgrey};
	position: absolute;
	width: 40px;
	height: 40px;
	bottom: 5px;
	right: 5px;
	border-radius: 100%;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	${mq.mdUp`
    display: flex;
	`}
`;

export default ReturnToTop;
