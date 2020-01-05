import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import { WithFeatures } from "../data/with-features";
import Placeholder from "../components/placeholder";
import mq from "../utils/media-query";

const H1 = styled.h1`
	${tachyons}
`;

const H2 = styled.h2`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const Col = styled(Div)`
	& + & {
		margin-top: var(--spacing-large);
		border-top: 1px solid red;
		padding-top: var(--spacing-large);

		${mq.smUp`
			margin-top: unset;
			padding-top: unset;
			border-left: 1px solid var(--light-gray);
		`}
	}
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

const Img = styled.img`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const Grid = styled.section`
	padding: 0 var(--spacing-large);

	${mq.smUp`
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: var(--spacing-medium);
	`}
`;

const ErrorPage = ({ features }) => {
	const [feature] = features;

	return (
		<Page>
			<Head>
				<title>404 - DotWatcher.cc</title>
				<meta property="og:title" content="404 - DotWatcher.cc" />
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

			<Grid>
				<Col mt3 mt4_l mh6_l>
					<H1 f3 f1_l fw6 lh_title mb4>
						404
					</H1>

					<H2 f4 f2_l fw6 lh_title mb4>
						Whoops, we've lost your dot!
					</H2>

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
				</Col>

				<Col mt3 mt4_l>
					<H2 f4 f2_l fw6 lh_title mb4 underline>
						Our latest feature
					</H2>

					<Link
						href={`/feature?slug=${feature.data.slug}`}
						as={`/feature/${feature.data.slug}`}
						passHref
					>
						<A f4 underline fl tracked ttl small_caps black hover_blue>
							<H2>{feature.data.title}</H2>

							{feature.data.image ? (
								<Img
									db
									mw_100
									src={`${feature.data.image.fields.file.url}?w=600&h=600&fm=jpg&q=50`}
									alt={feature.data.image.fields.description}
								/>
							) : (
								<Placeholder w_100 h_100 pv6 bg_light_gray />
							)}

							<P>{feature.data.excerpt}</P>
						</A>
					</Link>
				</Col>
			</Grid>

			<Footer />
		</Page>
	);
};

export default WithFeatures(ErrorPage);
