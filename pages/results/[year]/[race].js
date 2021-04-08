import React, { Component, Fragment, useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import { useRouter } from "next/router";

import Link from "next/link";

import {
	NationalityGraph,
	ScratchedGraph,
	Table,
	TableFilters
} from "@ComponentsNew/Results";
import GenderSplit from "../../../components/Results/gender-split";
import ResultsContribute from "@ComponentsNew/ResultsContribute";
import { Accordion, AccordionItem } from "../../../components/UI/Accordion";

import client from "@Utils/apollo";
import { gql } from "@apollo/client";

const Heading = styled.header`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;
const Div = styled.div`
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;

const Description = styled.p`
	${tachyons}
`;

const QLQuery = `
	error {
		message
	}
	name
	description
	sorts {
		name
		value
	}
	filters {
		name
		key
		values {
			name
			value
		}
	}
	results {
		class
		category
		position
		result
		finishlocation
		days
		hours
		minutes
		bike
		notes
		rider {
			name
			nationality
		}
	}
`;

const RaceResults = ({ data }) => {
	const [race, setRace] = useState(data.race);
	const [sort, setSort] = useState("riders__name_ASC");
	const [filters, setFilters] = useState([]);

	useEffect(() => {
		const handleQueryChange = async () => {
			const args = filters
				.map(f => {
					const [filter, value] = f.split("=");
					return `${filter}: "${value}"`;
				})
				.join(", ");

			try {
				const { data } = await client.query({
					variables: {
						year: query.year,
						slug: query.race,
						sort
					},
					query: gql`
					query result(
						$year: String!
						$slug: String!
						$sort: [ResultsSortEnum]
					) {
						race(year: $year, slug: $slug, sort: $sort, ${args}) {
							${QLQuery}
						}
					}
				`
				});

				setRace(data.race);
			} catch (error) {
				console.log(error);
			}
		};

		handleQueryChange();
	}, [sort, filters]);

	const { query } = useRouter();

	// Sort by Rank, then sort by Scratched / OTL Finish
	let results = race.results ? race.results.filter(r => r.position) : [];
	results = results.sort((a, b) => a.position - b.position);

	let unpositioned = race.results ? race.results.filter(r => !r.position) : [];
	unpositioned = unpositioned.sort((a, b) => b.finsihed > a.finsihed);

	unpositioned = unpositioned.sort((a, b) => {
		return a.result === b.result ? 0 : b.result === "Scratched" ? -1 : 1;
	});

	results = [...results, ...unpositioned];

	const hasNationalities =
		results.map(d => d.rider.nationality).filter(n => n).length > 0;

	const handleResetFilters = () => {
		setFilters([]);
	};

	const handleSortChange = async e => {
		await setSort(e.target.value);
	};

	const handleFilterChange = async e => {
		await setFilters(prev => [...prev, e.target.value]);
	};

	return (
		<>
			<Head>
				<title>
					{race.name} {race.year} Results - DotWatcher.cc
				</title>
				<link
					rel="canonical"
					href={`https://dotwatcher.cc/results/${race.year}/${race.slug}`}
				/>
				<meta
					property="og:title"
					content={`${race.name} ${race.year} Results - DotWatcher.cc`}
				/>
				<meta
					property="og:description"
					content="A history of results from the ultra-cycling world, in one database."
				/>
				<meta
					property="og:image"
					content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta
					name="twitter:title"
					content={`${race.name} ${race.year} Results - DotWatcher.cc`}
				/>
				<meta
					name="twitter:description"
					content="A history of results from the ultra-cycling world, in one database."
				/>
				<meta
					name="description"
					content="A history of results from the ultra-cycling world, in one database."
				/>
			</Head>

			<Div mt3 mt4_l mh6_l>
				<Div pb5>
					<Link href="/results">
						<A ph3 db link near_black hover_blue passHref title="All Results">
							← All results
						</A>
					</Link>

					<Heading fl w_100 mb4 ph3>
						<H1 f3 f1_l fw6 lh_title mb0>
							{race.name} {race.year} results
						</H1>
						{race.description && (
							<Description measure_wide f4 lh_copy>
								{race.description}
							</Description>
						)}
					</Heading>

					{race.results && race.results.length ? (
						<Fragment>
							<Accordion>
								{hasNationalities && (
									<AccordionItem id="stats" title="Nationality">
										<NationalityGraph data={results} />
									</AccordionItem>
								)}

								<AccordionItem id="nationality" title="Finished / Scratched">
									<ScratchedGraph data={results} />
								</AccordionItem>

								<AccordionItem id="gender" title="Gender">
									<GenderSplit data={results} />
								</AccordionItem>

								<AccordionItem id="results" title="Results" isOpen>
									<TableFilters
										data={race}
										handleResetFilters={handleResetFilters}
										handleSortChange={handleSortChange}
										handleFilterChange={handleFilterChange}
										filters={filters}
									/>
									<Table data={race} />
								</AccordionItem>
							</Accordion>
						</Fragment>
					) : (
						<H3 ph3>No results have been published for {race.name}</H3>
					)}
					<ResultsContribute />
				</Div>
			</Div>
		</>
	);
};

export const getServerSideProps = async ctx => {
	try {
		const { data } = await client.query({
			variables: { year: ctx.params.year, slug: ctx.params.race },
			query: gql`
				query result($year: String!, $slug: String!) {
					race(year: $year, slug: $slug) {
						${QLQuery}
					}
				}
			`
		});

		return {
			props: {
				data
			}
		};
	} catch (error) {
		console.log(error);

		return {
			props: {}
		};
	}
};

export default RaceResults;
