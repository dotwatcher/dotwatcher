/**
 * /results/2021/tour-te-waipounamu-2021?rider=Georgia%20Whitla
 */

import { useTable, useSortBy } from "react-table";
import dim from "@Utils/dim";
import colors from "@Utils/colors";
import { useRouter } from "next/router";

import Link from "next/link";
import { formatEnum } from "node_modules/@dotwatcher/utils";

import styled, { css } from "styled-components";
import { curveLinearClosed } from "d3";

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

	a {
		cursor: pointer;
		text-decoration: underline;
		width: 100%;
		display: inline-block;
	}
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

const ResultsTable = ({
	data = [],
	columns = [],
	hiddenColumns = [],
	sortBy = []
}) => {
	const router = useRouter();
	console.log(sortBy);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable(
		{
			columns,
			data,
			initialState: {
				hiddenColumns,
				sortBy
			}
		},
		useSortBy
	);

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
								active={
									router.query.rider && router.query.rider === row.values.rider
								}
							>
								{row.cells.map(cell => {
									const { year, slug, name } = cell.row.original;

									return (
										<TableCell
											{...cell.getCellProps()}
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
											) : cell.column.id === "racename" ? (
												<Link
													passHref
													href={`/results/${year}/${slug}?rider=${name}`}
												>
													<a title={cell.value}>{cell.value}</a>
												</Link>
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

export default ResultsTable;
