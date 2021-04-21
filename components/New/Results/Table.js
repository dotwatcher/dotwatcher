import { useMemo } from "react";

import styled from "styled-components";

import Table from "@Components/UI/Table";

const Section = styled.section`
	overflow-x: scroll;
`;

const Results = ({ data, activeRider }) => {
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
				Header: "Finish Distance",
				accessor: "finishdistance"
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
		"finishdistance",
		"notes"
	];

	// Find any columns out of the list where ther are no values
	const hiddenColumns = ifHiddenColumns.map(columnName => {
		if (data.results.every(x => !x[columnName])) {
			return columnName;
		}

		return "";
	});

	return (
		<Section>
			<Table columns={columns} hiddenColumns={hiddenColumns} data={dataRows} />
		</Section>
	);
};

export default Results;
