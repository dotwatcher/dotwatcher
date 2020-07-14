import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import SocialIcons from "../shared/social-icons";
import Newsletter from "../Newsletter";

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

const Footer = () => {
	return (
		<>
			<Div fl w_100 bg_near_white mt4 className="cf">
				<Div pv3 mh6_l>
					<Div fl w_100 w_50_ns ph3 mb4>
						<H2 f3 mb2 fw6>
							About
						</H2>
						<P lh_copy measure dark_gray>
							DotWatcher is here to showcase the best of long distance
							self-supported bike racing. The DotWatcher Digest is a regular
							roundup of the best content from around the bikepacking
							webosphere, delivered via an exclusive newsletter.
						</P>
						<Newsletter />
					</Div>

					<Div fr="true" w_100 w_25_ns ph3 mb4>
						<H2 f3 mb2 fw6>
							Contact
						</H2>
						<P lh_copy measure_narrow dark_gray>
							If you have a race you would like us to cover or just want to get
							in touch email us at{" "}
							<A
								link
								near_black
								underline
								hover_blue
								href="mailto:info@dotwatcher.cc"
							>
								info@dotwatcher.cc
							</A>
						</P>
						<SocialIcons size="2" colour="near-black" />
					</Div>
				</Div>
			</Div>

			<Div f6 w_100 bg_near_white tc className="cf">
				<div>
					Icons made by{" "}
					<a
						href="https://www.flaticon.com/authors/freepik"
						title="Freepik"
						target="_blank"
					>
						Freepik
					</a>{" "}
					from{" "}
					<a href="https://www.flaticon.com/" title="Flaticon" target="_blank">
						www.flaticon.com
					</a>
				</div>
			</Div>
		</>
	);
};

export default Footer;
