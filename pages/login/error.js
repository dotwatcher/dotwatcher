import Head from "next/head";
import Page from "../../components/shared/page";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Router, { withRouter } from "next/router";

const H1 = styled.h1`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const Buttons = styled(Div)`
	${tachyons}

	a + a {
		margin-left: var(--spacing-large);
	}
`;

const A = styled.a`
	${tachyons}
`;

const LoginError = ({ router }) => {
	console.log(router);
	return (
		<Page>
			<Head>
				<title>Dotwatcher.cc</title>
				<meta property="og:title" content="Dotwatcher.cc" />
				<meta
					property="og:description"
					content="DotWatcher is here to showcase the best of long distance self-supported bike racing."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>

			<Header title="dotwatcher.cc" />

			<Div ph4 ph6_l>
				<Div mt3 mt4_l>
					<H1 f3 f1_l fw6 lh_title mb4>
						We had an issue signing you in or out
					</H1>

					<P f4 f3_ns lh_copy measure_narrow near_black>
						There were some technical issues with your request, try again or if
						the problem continues please contact{" "}
						<A
							near_black
							hover_blue
							href={`mailto:info@dotwatcher.cc?subject=Issue at login&body=Error From: ${router.query.errorLocation}. %0D%0A Error Logs: ${router.query.errorLogs}`}
						>
							info@dotwatcher.cc
						</A>{" "}
						with this pre-populated email.
					</P>

					<Buttons>
						<A
							href="/api/auth/login"
							f4
							bg_blue
							fl
							ph3
							pv2
							mb3
							center
							tc
							white
							tracked
							ttl
							small_caps
							ba
							bw1
							b__blue
						>
							Try again
						</A>
					</Buttons>
				</Div>
			</Div>
			<Footer />
		</Page>
	);
};

export default withRouter(LoginError);
