import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import Placeholder from "../placeholder";
import widont from "../../utils/widont";
import Section from "./section";
import Image from '../NextImage'

const A = styled.a`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;
const Figure = styled.figure`
	${tachyons}
`;
const Img = styled.img`
	${tachyons}
`;
const Span = styled.span`
	${tachyons}
`;
const P = styled.p`
	${tachyons}
`;
const Wrap = styled.dl`
	${tachyons}
`;
const Label = styled.dt`
	${tachyons}
`;
const Stat = styled.dt`
	${tachyons}
`;
const Results = styled.table`
	border: none;
	border-collapse: collapse;
	border-spacing: 0;
	${tachyons}
`;
const ResultsRow = styled.tr`
	${tachyons}
`;
const ResultsCell = styled.td`
	${tachyons}
`;

const RaceFigure = styled(Figure)`
	width: 100%;

	@media screen and (min-width: 48em) {
		width: 20%;
	}
`;

const RacePreview = ({ data }) => {
	const noun = data.slug.includes("paris-brest") ? "audax" : "race";
	return (
		<Div className="with-divider cf">
			<RaceFigure ma0 pa0 fl ph3>
				<Link
					href={`/race/${data.slug}`}
					passHref
				>
					<a>
						{data.icon ? (
							<Image width={300} height={300} src={data.icon.fields.file.url}	alt={data.icon.fields.description} 	title={data.icon.fields.description} />
						) : (
							<Placeholder w_100 h_100 pv6 bg_light_gray />
						)}
					</a>
				</Link>
			</RaceFigure>
			<Div fl_ns ph3 w_50_m w_60_l mb4>
				<Link
					href={`/race/${data.slug}`}
					passHref
				>
					<A link near_black>
						<H1 f2 fw6 ma0 lh_title link hover_blue>
							{widont(data.title)}
						</H1>
						<H3 ma0 mt2 f6 fw4>
							<Span fw6>Start:</Span> {moment(data.raceDate).format("LLLL")}
						</H3>
						<P measure_wide lh_copy>
							{widont(data.description)}
						</P>
						<Span dib f6 ttu fw5 tracked ba bw1 pv2 ph3 hover_blue>
							{moment(data.raceEndDate).isBefore()
								? `Look back at the ${noun} »`
								: `Follow the ${noun} »`}
						</Span>
					</A>
				</Link>
			</Div>
			<Section title="Fact file">
				{data.location ? (
					<Wrap>
						<Label dib f6>
							Location:
						</Label>
						<Stat dib f6 ml1 fw6>
							{data.location}
						</Stat>
					</Wrap>
				) : null}
				{data.length ? (
					<Wrap>
						<Label dib f6>
							Length:
						</Label>
						<Stat dib f6 ml1 fw6>
							{data.length}
						</Stat>
					</Wrap>
				) : null}
				{data.riders ? (
					<Wrap>
						<Label dib f6>
							Riders:
						</Label>
						<Stat dib f6 ml1 fw6>
							{data.riders}
						</Stat>
					</Wrap>
				) : null}
				{data.lastYearsWinner ? (
					<Wrap>
						<Label dib f6>
							{data.winnerLabel
								? `${data.winnerLabel}:`
								: `Last year’s winner:`}
						</Label>
						<Stat dib f6 ml1 fw6>
							{data.lastYearsWinner}
						</Stat>
					</Wrap>
				) : null}
				{data.terrain ? (
					<Wrap>
						<Label dib f6>
							Terrain:
						</Label>
						<Stat dib f6 ml1 fw6>
							{data.terrain}
						</Stat>
					</Wrap>
				) : null}
			</Section>
			{data.past && data.raceResults.length > 0 ? (
				<Section title={data.year + " Results"}>
					<Results w_100 ma0 mb3 pa0>
						<tbody>
							{data.raceResults.map((result, i) => {
								return (
									<ResultsRow>
										<ResultsCell f6 lh_copy fw6>
											{i + 1}.&nbsp;
											<Link
												href={`/profile/${result.Rider}`}
												passHref
											>
												<A
													link
													near_black
													hover_blue
													underline
													title={`See ${result.Rider}’s past results`}
												>
													{result.Rider}
												</A>
											</Link>
										</ResultsCell>
										<ResultsCell tr f6 lh_copy v_top>
											<abbr title="(D:H:MM)">
												{result["Finish Time (D:H:MM)"]}
											</abbr>
										</ResultsCell>
									</ResultsRow>
								);
							})}
						</tbody>
					</Results>
					<Link
						href={`/results/${data.year}/${data.title}`}
						passHref
					>
						<A link near_black f6 fw6 db>
							See all results »
						</A>
					</Link>
				</Section>
			) : (
				""
			)}
		</Div>
	);
};

RacePreview.propTypes = {
	data: PropTypes.object.isRequired
};

export default RacePreview;
