import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

const Div = styled.div`
	${tachyons}
`;
const Header = styled.header`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;
const Years = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
	${tachyons}
`;
const Year = styled.li`
	&:only-child {
		width: 33%;
	}
	${tachyons}
`;

const ResultsSummary = ({ race, filtered }) => {
	if (filtered !== "" && filtered !== race.name) return null;

	return (
		<Div id={race.name}>
			<Header mv3 pb1 bb bw1 b__light_gray>
				<Link href={`/series/${race.name}`} passHref>
					<A title={race.name}>
						<H2 ma0 f3 fw6>
							{race.name}
						</H2>
					</A>
				</Link>
			</Header>
			<Years ma0 pa0 tc>
				{race.events.map((event, index) => (
					<Year dib bg_light_gray ba bw1 b__white f4 lh_copy key={index}>
						<Link href={`/results/${event.year}/${event.slug}`} passHref>
							<A db pa2 data-id={event.id}>
								{event.year}
							</A>
						</Link>
					</Year>
				))}
			</Years>
		</Div>
	);
};

ResultsSummary.propTypes = {
	race: PropTypes.object.isRequired
};

export default ResultsSummary;
