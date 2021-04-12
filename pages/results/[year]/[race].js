import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import { useRouter } from "next/router";
import { HEAD } from "@Utils/contstants";

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
import useSkipFirstRender from "@Hooks/useSkipFirstRender";

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
	year
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

const getFilterArgs = (args = []) =>
	args
		.map(f => {
			const [filter, value] = f.split("=");

			// If the filter is location or nationlity we need to pass a string not an ENUM
			if (filter === "finishlocation" || filter === "nationality") {
				return `${filter}: "${value}"`;
			}

			return `${filter}: ${value}`;
		})
		.join(", ");

const RaceResults = ({ data }) => {
	const router = useRouter();
	const { query } = router;

	const [race, setRace] = useState(data.race);
	const [sort, setSort] = useState("results__position_ASC");
	const [activeRider, setActiveRider] = useState(router.query.rider);
	const [filters, setFilters] = useState(
		router.query.filters ? router.query.filters.split(",") : []
	);

	useSkipFirstRender(() => {
		const handleQueryChange = async () => {
			const route = filters.length
				? `/results/${router.query.year}/${
						router.query.race
				  }?filters=${filters.join(",")}`
				: `/results/${router.query.year}/${router.query.race}`;

			if (filters.length) {
				router.push(route, undefined, {
					shallow: true
				});
			} else {
				router.push(
					`/results/${router.query.year}/${router.query.race}`,
					undefined,
					{
						shallow: true
					}
				);
			}

			const args = getFilterArgs(filters);

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
		if (filters.includes(e.target.value)) {
			await setFilters(prev => prev.filter(f => f !== e.target.value));

			return;
		}

		await setFilters(prev => [...prev, e.target.value]);
	};

	const metaDescription =
		race.description ||
		"A history of results from the ultra-cycling world, in one database.";

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
					key={HEAD.OG_TITLE}
					property="og:title"
					content={`${race.name} ${race.year} Results - DotWatcher.cc`}
				/>
				<meta
					key={HEAD.OG_DESCRIPTION}
					property="og:description"
					content={metaDescription}
				/>
				<meta
					key={HEAD.OG_IMAGE}
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
				<meta name="twitter:description" content={metaDescription} />
				<meta name="description" content={metaDescription} />
			</Head>

			<Div mt3 mt4_l mh6_l>
				<Div pb5>
					<Link href="/results">
						<A db link near_black hover_blue passHref title="All Results">
							← All results
						</A>
					</Link>

					<Heading w_100>
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
						<div>
							<TableFilters
								data={race}
								handleResetFilters={handleResetFilters}
								handleSortChange={handleSortChange}
								handleFilterChange={handleFilterChange}
								filters={filters}
							/>

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
									<Table data={race} activeRider={activeRider} />
								</AccordionItem>
							</Accordion>
						</div>
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
		const filters = ctx.query.filters ? ctx.query.filters.split(",") : [];
		const args = getFilterArgs(filters);

		const { data } = await client.query({
			variables: { year: ctx.params.year, slug: ctx.params.race },
			query: gql`
				query result($year: String!, $slug: String!) {
					race(year: $year, slug: $slug, ${args}) {
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
