import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";

export default styled.section`
	margin-top: ${dim(2)};
	padding-top: ${dim(2)};

	& + & {
		border-top: 1px solid ${colors.lightgrey};
	}
`;
