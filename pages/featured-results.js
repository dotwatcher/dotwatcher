import Head from "next/head";
import PropTypes from "prop-types";
import Header from "../components/header";
import Page from "../components/shared/page";
import Footer from "../components/footer";
import { WithResults } from "../data/with-featured-results";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

const Styles = styled.div`
	padding: 1rem;

	table {
		border-spacing: 0;
		border: 1px solid black;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;

			:last-child {
				border-right: 0;
			}
		}
	}
`;

const Results = props => {
	console.log(props.races[0].events);

	const headers = [
		"Race",
		"Year",
		"Rank",
		"Rider",
		"Cap/Bib",
		"Class/Category",
		"Result",
		"Bike",
		"Finish Location",
		"Finish Time",
		"Notes"
	];

	const columns = React.useMemo(() => headers.map(h => ({ Header: h })), []);

	const data = React.useMemo(() => props.races, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable(
		{
			columns,
			data
		},
		useSortBy
	);

	const firstPageRows = rows.slice(0, 20);

	return (
		<Page>
			<Head>
				<title>Results - DotWatcher.cc</title>
				<link rel="canonical" href={`https://dotwatcher.cc/featured-results`} />
				<meta
					property="og:title"
					content={`Featured Results - DotWatcher.cc`}
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
					content={`Featured Results - DotWatcher.cc`}
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
			<Header title="dotwatcher.cc" />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								// Add the sorting props to control sorting. For this example
								// we can add them into the header props
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{/* Add a sort direction indicator */}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{firstPageRows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			<Footer />
		</Page>
	);
};

Results.propTypes = {
	allRaces: PropTypes.array
};

Results.defaultProps = {
	raceResultsByYear: []
};

export default WithResults(Results);
