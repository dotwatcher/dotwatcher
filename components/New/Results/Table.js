import { useMemo } from "react";

import Table from "@Components/UI/Table";
import { MAX_POSITION_OVERRIDE } from "@Utils/contstants";

const Results = ({ data, activeRider }) => {
	const dataRows = useMemo(
		() =>
			data.results.map(d => ({
				...d,
				rider: d.rider.name,
				riderNationality: d.rider.nationality,
				// If there is no positon, set the value to be a really high number so the result is not presented before the number "1	"
				position: d.position || MAX_POSITION_OVERRIDE,
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

	const ifHiddenColumns = ["cap", "finishlocation", "finishdistance", "notes"];

	// Find any columns out of the list where ther are no values
	const hiddenColumns = ifHiddenColumns.map(columnName => {
		if (data.results.every(x => !x[columnName])) {
			return columnName;
		}

		return "";
	});

	// Have to do rider nationality seperately as column head and attr are differnt
	if (data.results.every(x => !x.rider.nationality)) {
		hiddenColumns.push("riderNationality");
	}

	return (
		<Table
			columns={columns}
			hiddenColumns={hiddenColumns}
			data={dataRows}
			sortBy={[
				{ id: "class", desc: true },
				{ id: "position", desc: false }
			]}
		/>
	);
};

export default Results;
