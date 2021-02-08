import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h3`
	font-size: 20px;
	line-height: 28px;
	margin-top: 0;
	font-weight: 600;

	${mq.mdUp`
		font-size: 24px;
		line-height: 30px;
  `};
`;
