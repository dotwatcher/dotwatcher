import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import widont from "../../utils/widont";
import Link from "next/link";

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
const Img = styled.img`
	${tachyons}
`;
const GridContainer = styled.div`
	display: grid;
	grid-gap: var(--spacing-large);
	grid-template-columns: 1fr 1fr;
	@media screen and (min-width: 48em) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: var(--spacing-extra-large);
	}
	a:nth-child(-n + 2) {
		grid-column-start: span 2;
	}

	.more-button {
		grid-column: 1 / 3;
	}
	@media screen and (min-width: 48em) {
		.more-button {
			grid-column: 2 / 4;
		}
	}
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;

const Grid = ({ blocks }) => {
	return (
		<Div mh4 mb4 mh5_ns mb5_ns>
			<H3 lh_solid f3 f2_ns mt0 mb4 fw6>
				Recently on DotWatcher
			</H3>
			<GridContainer>
				{blocks.map((block, i) => {
					const Route = ({ absoluteURL = false, children }) => {
						if (absoluteURL) {
							return (
								<A
									db
									link
									near_black
									hover_blue
									key={block.sys.id}
									href={absoluteURL}
								>
									{children}
								</A>
							);
						}

						return (
							<Link
								href={`/feature?slug=${block.feature}`}
								as={`/feature/${block.feature}`}
								passHref
							>
								<A db link near_black hover_blue key={block.sys.id}>
									{children}
								</A>
							</Link>
						);
					};

					return (
						<Route key={block.sys.id} absoluteURL={block.link}>
							<Div>
								<Img
									mw_100
									src={`${block.image.fields.file.url}?w=800&h=500&fit=fill&q=60`}
								/>
							</Div>
							{i < 2 ? (
								<H2 lh_solid fw6 f5 f3_ns>
									{block.heading}
								</H2>
							) : (
								<H2 lh_title fw6 f6 f5_ns>
									{block.heading}
								</H2>
							)}
							{i < 2 ? (
								<P f6 f5_l measure ma0 lh_copy>
									{widont(block.words)}
								</P>
							) : null}
						</Route>
					);
				})}
				<Link href="/features" as="/features" passHref>
					<A
						lh_solid
						f4
						f3_ns
						ma0
						fw5
						db
						link
						near_black
						hover_bg_light_blue
						ph3
						pv2
						bg_blue
						white
						ttu
						tracked
						tc
						className="more-button"
					>
						All features
					</A>
				</Link>
			</GridContainer>
		</Div>
	);
};

Grid.propTypes = {
	blocks: PropTypes.array.isRequired
};

export default Grid;
