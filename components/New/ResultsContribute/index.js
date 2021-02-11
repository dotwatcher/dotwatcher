import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import H2 from "@Components/UI/H2";
import P from "@Components/UI/P";

const Div = styled.div`
	${tachyons}
`;

const ResultsContribute = () => {
	return (
		<Div mh3 mt4 id="contact">
			<H2>DotWatcher needs your help</H2>
			<P>
				<strong>Riders:</strong> You know these races better than anyone. If you
				notice any potential errors in the race results,{" "}
				<a href="mailto:info@dotwatcher.cc">please let us know</a>.
			</P>
			<P>
				<strong>Race organisers:</strong> If you would like to help grow the
				community and contribute to the results database,{" "}
				<a href="mailto:info@dotwatcher.cc">please get in touch</a>.
			</P>
		</Div>
	);
};

export default ResultsContribute;
