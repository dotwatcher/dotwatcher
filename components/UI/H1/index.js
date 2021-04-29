import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h1`
	font-size: 30px;
	margin-top: 0;
	font-weight: 600;

	${mq.mdUp`
    font-size: 36px;
  `};
`;
