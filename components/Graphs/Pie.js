import * as d3 from "d3";
import { useState, useEffect } from "react";

const createGraph = ({ ref, data }) => {
	const width = 540;
	const height = 540;
	const radius = Math.min(width, height) / 2;

	const svg = d3
		.select(".graph-entry")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", `translate(${width / 2}, ${height / 2})`);

	const color = d3.scaleOrdinal(d3.schemeCategory10);

	const pie = d3.pie().value(d => d.count);

	const arc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(radius);

	function arcTween(a) {
		const i = d3.interpolate(this._current, a);
		this._current = i(1);

		return t => arc(i(t));
	}

	d3.selectAll(".data-update").on("change", update);

	function update(val = this.value) {
		// Join new data
		const path = svg.selectAll("path").data(pie(data[val]));

		// Update existing arcs
		path
			.transition()
			.duration(200)
			.attrTween("d", arcTween);

		// Enter new arcs
		path
			.enter()
			.append("path")
			.attr("fill", (d, i) => color(i))
			.attr("d", arc)
			.attr("stroke", "white")
			.attr("stroke-width", "2px")
			.each(function(d) {
				this._current = d;
			});
	}

	update(Object.keys(data)[0]);
};

export default ({ data, definitions }) => {
	// const mock = {
	// 	apples: [
	// 		{ region: "North", count: "53245" },
	// 		{ region: "South", count: "28479" },
	// 		{ region: "East", count: "19697" },
	// 		{ region: "West", count: "24037" },
	// 		{ region: "Central", count: "40245" }
	// 	],
	// 	oranges: [
	// 		{ region: "North", count: "200" },
	// 		{ region: "South", count: "200" },
	// 		{ region: "East", count: "200" },
	// 		{ region: "West", count: "200" },
	// 		{ region: "Central", count: "200" }
	// 	]
	// };

	const mock = {
		result: [
			{
				region: "Finished",
				count: "32"
			},
			{
				region: "Scratcged",
				count: "32"
			}
		],
		nationality: [
			{
				region: "USA",
				count: "25"
			},
			{
				region: "ICELAND",
				count: "1"
			},
			{
				region: "IRELAND",
				count: "1"
			},
			{
				region: "FRANCE",
				count: "5"
			},
			{
				region: "AUSTRALIA",
				count: "7"
			},
			{
				region: "ITALY",
				count: "21"
			},
			{
				region: "NORWAY",
				count: "15"
			},
			{
				region: "NEW ZEALAND",
				count: "72"
			}
		],
		category: [
			{
				region: "Men",
				count: "25"
			},
			{
				region: "Women",
				count: "7"
			}
		]
	};

	const dataset = mock;

	const transformedData = definitions.reduce((acc, curr) => {
		if (!curr) return acc;

		var counts = {};

		let values = data.map(d => d[curr.identifier]);

		// Convert values into an object where key is name, and value is occurance in array
		values.forEach(x => {
			counts[x] = (counts[x] || 0) + 1;
		});

		return {
			...acc,
			[curr.identifier]: Object.keys(counts).map(c => ({
				region: c,
				count: counts[c].toString()
			}))
		};
	}, {});

	useEffect(() => {
		createGraph({ data: mock });
	}, []);

	const [checked, setchecked] = useState(Object.keys(transformedData)[0]);

	return (
		<div className="graph-entry">
			<form>
				{definitions.map((definition, i) => (
					<label key={definition.identifier}>
						<input
							className="data-update"
							type="radio"
							name="dataset"
							value={definition.identifier}
							checked={definition.identifier === checked}
							onChange={e => setchecked(e.target.value)}
						/>{" "}
						{definition.label}
					</label>
				))}
			</form>
		</div>
	);
};
