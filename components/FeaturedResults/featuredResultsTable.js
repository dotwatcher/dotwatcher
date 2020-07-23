import React from "react";
import { useTable, useSortBy } from "react-table";

import styled from "styled-components";

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

export default ({ race }) => {
	// return null;
	const columns = React.useMemo(() => headers.map(h => ({ Header: h })), []);

	const data = React.useMemo(() => race, []);

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

	return (
		<Styles>
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
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render()}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Styles>
	);
};
