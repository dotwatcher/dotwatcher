import styled from "styled-components";
import colors from "@Utils/colors";
import mq from "@Utils/media-query";

const ReturnToTop = styled.button`
	display: none;

	${mq.mdUp`
		position: absolute;
    background: white;
    width: 40px;
    height: 40px;
    bottom: 5px;
    right: 5px;
    border: 1px solid ${colors.lightgrey};
    border-radius: 100%;
    display: flex;
    justify-content: center;
		align-items: center;
		cursor: pointer;
	`}
`;

export default ReturnToTop;
