import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h4`
	font-size: 18px;
	margin-top: 0;

	${mq.mdUp`
    font-size: 20px;
  `};
`;
