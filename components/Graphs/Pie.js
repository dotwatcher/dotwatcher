import * as d3 from "d3";
import { useRef, useEffect } from "react";

const createGraph = ({ ref, data }) => {
	const width = 540;
	const height = 540;
	const radius = Math.min(width, height) / 2;

	const svg = d3
		.select(ref.current)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", `translate(${width / 2}, ${height / 2})`);

	const color = d3.scaleOrdinal([
		"#66c2a5",
		"#fc8d62",
		"#8da0cb",
		"#e78ac3",
		"#a6d854",
		"#ffd92f"
	]);

	const pie = d3
		.pie()
		.value(d => d.count)
		.sort(null);

	const arc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(radius);

	function type(d) {
		d.apples = Number(d.apples);
		d.oranges = Number(d.oranges);
		return d;
	}

	function arcTween(a) {
		const i = d3.interpolate(this._current, a);
		this._current = i(1);
		return t => arc(i(t));
	}

	d3.selectAll("input").on("change", update);

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
			.attr("stroke-width", "6px")
			.each(function(d) {
				this._current = d;
			});
	}

	update("apples");
};

const dataset = {
	apples: [
		{ region: "North", count: "53245" },
		{ region: "South", count: "28479" },
		{ region: "East", count: "19697" },
		{ region: "West", count: "24037" },
		{ region: "Central", count: "40245" }
	],
	oranges: [
		{ region: "North", count: "200" },
		{ region: "South", count: "200" },
		{ region: "East", count: "200" },
		{ region: "West", count: "200" },
		{ region: "Central", count: "200" }
	]
};

export default ({ data, definitions }) => {
	const ref = useRef(null);

	const transformedData = definitions.flatMap(definition => {
		var counts = {};

		let values = data.map(d => d[definition.identifier]);

		// Convert values into an object where key is name, and value is occurance in array
		values.forEach(x => {
			counts[x] = (counts[x] || 0) + 1;
		});

		return Object.keys(counts).map(x => ({
			value: x === "null" ? "Not Specified" : x,
			type: definition.label,
			count: counts[x]
		}));
	});

	useEffect(() => {
		if (ref && ref.current && data) {
			createGraph({ ref, data: dataset });
		}
	}, []);

	return (
		<div ref={ref}>
			<form>
				<label>
					<input type="radio" name="dataset" value="apples" checked /> Apples
				</label>
				<label>
					<input type="radio" name="dataset" value="oranges" /> Oranges
				</label>
			</form>
		</div>
	);
};
