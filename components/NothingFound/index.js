import { Div, P, H3, A } from "../UI/Tachyons";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Header from "../header";
import Footer from "../footer";

const Buttons = styled(Div)`
	${tachyons}

	a + a {
		margin-left: var(--spacing-large);
	}
`;

const NothingFound = ({ user, children }) => {
	return (
		<Fragment>
			<Head>
				<title>Nothing Found - DotWatcher.cc</title>
				<meta property="og:title" content="Nothing Found - DotWatcher.cc" />

				<meta
					property="og:description"
					content="Nothing Found - DotWatcher.cc"
				/>

				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
			</Head>
			<Header user={user} title="dotwatcher.cc" />
			<Div mt3 mt4_l mh6_l>
				<Div pb5>
					<H3>Nothing found</H3>

					<P>We couldn't find what you were looking for</P>

					{children}
				</Div>

				<Div pb5>
					<Buttons>
						<Link href="/" passHref>
							<A f4 underline fl tracked ttl small_caps black hover_blue>
								Home
							</A>
						</Link>

						<Link href="/races" passHref>
							<A f4 underline fl tracked ttl small_caps black hover_blue>
								Races
							</A>
						</Link>

						<Link href="/races" passHref>
							<A f4 underline fl tracked ttl small_caps black hover_blue>
								Results
							</A>
						</Link>

						<Link href="/features" passHref>
							<A f4 underline fl tracked ttl small_caps black hover_blue>
								Features
							</A>
						</Link>
					</Buttons>
				</Div>
			</Div>
			<Footer />
		</Fragment>
	);
};

export default NothingFound;
