import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const H2 = styled.h2`
	${tachyons}
`;
const P = styled.p`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;

const Contribute = () => {
	return (
		<Div mt5 bt bw1 b__light_gray>
			<H2 f4 f3_l lh_title mb2 fw5>
				Become a DotWatcher contributor
			</H2>
			<P lh_copy f5 measure ma0>
				Do you have stories, photos, or insight that would be at home on
				DotWatcher? Drop us a line at{" "}
				<a href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</a>, or find us
				on{" "}
				<a
					target="_blank"
					href="https://twitter.com/dotwatcher"
					title="Find DotWatwatcher on Twitter"
				>
					Twitter
				</a>
				and&nbsp;
				<a
					target="_blank"
					href="https://www.instagram.com/dotwatcher.cc/"
					title="Find DotWatcher on Instagram"
				>
					Instagram
				</a>
				.
			</P>
		</Div>
	);
};

export default Contribute;
