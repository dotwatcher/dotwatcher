import React from "react";
import styled from "styled-components";
import SocialIcons from "../shared/social-icons";
import Newsletter from "../Newsletter";
import Link from "next/link";
import { Div, H2, P, A, Footer } from "../UI/Tachyons";

const InfoPages = styled(Div)`
	a + a {
		margin-left: var(--spacing-medium);
	}
`;

const AppFooter = () => {
	return (
		<Footer fl w_100 bg_near_white mt4 className="cf">
			<Div pv3 mh6_l>
				<Div>
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

					<Div fr w_100 w_25_ns ph3 mb4>
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

			<InfoPages pv3 w_100 fl>
				<Div ph3 mb4 mh6_l>
					<Link href="/info/data-policy">
						<A link near_black underline hover_blue pointer>
							Data Policy
						</A>
					</Link>

					<Link href="/info/submissions">
						<A link near_black underline hover_blue pointer>
							Submit to Dotwatcher
						</A>
					</Link>
				</Div>
			</InfoPages>
		</Footer>
	);
};

export default AppFooter;
