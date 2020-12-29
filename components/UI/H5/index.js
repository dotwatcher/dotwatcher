import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h5`
	font-size: 14px;
	margin-top: 0;
	font-weight: normal;

	${mq.mdUp`
    font-size: 16px;
  `};
`;
