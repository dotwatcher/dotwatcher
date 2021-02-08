import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h4`
	font-size: 18px;
	line-height: 22px;
	margin-top: 0;
	font-weight: normal;

	${mq.mdUp`
		font-size: 20px;
		line-height: 28px;
  `};
`;
