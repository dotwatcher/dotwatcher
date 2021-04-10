/**
 * /results/2021/tour-te-waipounamu-2021?rider=Georgia%20Whitla
 */

import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import dim from "@Utils/dim";
import colors from "@Utils/colors";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatEnum } from "node_modules/@dotwatcher/utils";

import styled, { css } from "styled-components";

const Section = styled.section`
	overflow-x: scroll;
`;

const Table = styled.table`
	border-collapse: collapse;
	min-width: 100%;
`;

const TH = styled.th`
	border-bottom: 2px solid black;
	text-align: left;
	line-height: 1.5;
	padding: ${dim(0.5)};
	text-transform: uppercase;

	&:hover {
		color: ${colors.primary};
	}

	span:hover {
		text-decoration: underline;
	}
`;

const TableCell = styled.td`
	padding: ${dim(1)} ${dim(0.5)};

	${({ clickable }) =>
		clickable &&
		css`
			cursor: pointer;
			text-decoration: underline;
		`}
`;

const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: ${colors.nearwhite};
	}

	&:hover {
		background-color: ${colors.primary};
		color: ${colors.white};

		a {
			color: ${colors.white};
		}
	}

	${({ active }) =>
		active &&
		css`
			background-color: ${colors.primary} !important; // overrides :odd above
			color: ${colors.white};

			a {
				color: ${colors.white};
			}
		`}
`;

const TableBody = styled.tbody`
	font-size: 16px;
`;

const Results = ({ data }) => {
	const dataRows = useMemo(
		() =>
			data.results.map(d => ({
				...d,
				rider: d.rider.name,
				riderNationality: d.rider.nationality,
				position: d.position || "—",
				finishTime: [d.days, d.hours, d.minutes].every(x => !x)
					? "—"
					: `${d.days || 0}d ${d.hours || 0}h ${d.minutes || 0}m`
			})),
		[data]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Position",
				accessor: "position"
			},
			{
				Header: "Rider",
				accessor: "rider"
			},
			{
				Header: "Cap",
				accessor: "cap"
			},
			{
				Header: "Class",
				accessor: "class"
			},
			{
				Header: "Category",
				accessor: "category"
			},
			{
				Header: "Result",
				accessor: "result"
			},
			{
				Header: "Nationality",
				accessor: "riderNationality"
			},
			{
				Header: "Bike",
				accessor: "bike"
			},
			{
				Header: "Finish Location",
				accessor: "finishlocation"
			},
			{
				Header: "Finish Time",
				accessor: "finishTime"
			},
			{
				Header: "Notes",
				accessor: "notes"
			}
		],
		[data]
	);

	const ifHiddenColumns = [
		"cap",
		"riderNationality",
		"finishlocation",
		"notes"
	];

	// Find any columns out of the list where ther are no values
	const hiddenColumns = ifHiddenColumns.map(columnName => {
		if (data.results.some(x => !x[columnName])) {
			return columnName;
		}

		return "";
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable(
		{
			columns,
			data: dataRows,
			initialState: {
				hiddenColumns
				// sortBy: ["finishTime"]
			}
		},
		useSortBy
	);

	const router = useRouter();

	return (
		<Section>
			<Table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => {
								return (
									<TH
										{...column.getHeaderProps(column.getSortByToggleProps())}
										title={`Sort by ${column.Header}`}
									>
										<span>{column.render("Header")}</span>

										{column.isSorted ? (column.isSortedDesc ? " ▲" : " ▼") : ""}
									</TH>
								);
							})}
						</tr>
					))}
				</thead>

				<TableBody {...getTableBodyProps()}>
					{rows.map((row, ind) => {
						prepareRow(row);

						return (
							<TableRow
								key={ind}
								{...row.getRowProps()}
								active={row.values.rider === router.query.rider}
							>
								{row.cells.map(cell => {
									return (
										<TableCell
											{...cell.getCellProps()}
											clickable={cell.column.id === "rider"}
											id={cell.column.id === "rider" ? cell.value : ""}
										>
											{cell.column.id === "rider" ? (
												<Link passHref href={`/profile/${cell.value}`}>
													<a title={cell.value}>{cell.value}</a>
												</Link>
											) : ["class", "category", "result", "bike"].includes(
													cell.column.id
											  ) ? (
												formatEnum(cell.value)
											) : (
												cell.render("Cell")
											)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Section>
	);
};

export default Results;
