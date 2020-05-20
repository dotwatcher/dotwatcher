import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const Div = styled.div`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const P = styled.p`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const ResultsContribute = () => {
	return (
		<Div fl mh3 mt4 id="contact">
			<H2 f3 f2_l lh_title>
				DotWatcher needs your help
			</H2>
			<P lh_copy f5 f4_l measure_wide>
				<strong>Riders:</strong> You know these races better than anyone. If you
				notice any potential errors in the race results,{" "}
				<A
					link
					near_black
					hover_blue
					underline
					href="mailto:info@dotwatcher.cc"
				>
					please let us know
				</A>
				.
			</P>
			<P lh_copy f5 f4_l measure_wide>
				<strong>Race organisers:</strong> If you would like to help grow the
				community and contribute to the results database,{" "}
				<A
					link
					near_black
					hover_blue
					underline
					href="mailto:info@dotwatcher.cc"
				>
					please get in touch
				</A>
				.
			</P>
		</Div>
	);
};

export default ResultsContribute;
