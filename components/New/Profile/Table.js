import { useMemo } from "react";
import { format } from "date-fns";

import Table from "@Components/UI/Table";

const Results = ({ data = [], name }) => {
	data = data || [];

	const dataRows = useMemo(
		() =>
			data.map(d => ({
				...d,
				name,
				position: d.position || "—",
				startdate: d.startdate ? format(d.startdate, "YYYY / MM") : "—",
				finishTime: [d.days, d.hours, d.minutes].every(x => !x)
					? "—"
					: `${d.days || 0}d ${d.hours || 0}h ${d.minutes || 0}m`
			})),
		[data]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Race",
				accessor: "racename"
			},
			{
				Header: "Name",
				accessor: "name"
			},
			{
				Header: "Date",
				accessor: "startdate"
			},
			{
				Header: "Position",
				accessor: "position"
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
			}
		],
		[data]
	);

	const ifHiddenColumns = ["cap", "notes", "finishlocation", "finishdistance"];

	// Find any columns out of the list where ther are no values
	let hiddenColumns = ifHiddenColumns.map(columnName => {
		if (data.every(x => !x[columnName])) {
			return columnName;
		}

		return "";
	});

	hiddenColumns = [...hiddenColumns, "name"];

	return (
		<Table
			columns={columns}
			hiddenColumns={hiddenColumns}
			s
			data={dataRows}
			sortBy={[
				{
					id: "startdate",
					desc: true
				}
			]}
		/>
	);
};

export default Results;
