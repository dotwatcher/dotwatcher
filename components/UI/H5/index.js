import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h5`
	font-size: 14px;
	margin-top: 0;
	font-weight: normal;
	line-height: 18px;

	${mq.mdUp`
		font-size: 16px;
		line-height: 22px;
  `};
`;
