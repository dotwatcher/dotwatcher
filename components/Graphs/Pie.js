/**
 * Data needs to be an array of objects with two properties - key, value
 *
 * [{
 * 	key: 'Some name'.
 * 	value: 7
 * }, {
 * 	key: 'Another thing',
 *  value: 10
 * }, {
 *  ...
 * }]
 */

import * as d3 from "d3";
import { useEffect } from "react";

const createGraph = ({ data, id }) => {
	const size = 500;
	const fourth = size / 4;
	const half = size / 2;
	const labelOffset = fourth * 1.4;
	const total = data.reduce((acc, cur) => acc + cur.value, 0);

	const chart = d3
		.select(`.graph-entry-${id}`)
		.append("svg")
		.attr("width", size)
		.attr("height", size)
		.append("g")
		.attr("transform", `translate(${0}, ${0})`);

	const plotArea = chart
		.append("g")
		.attr("transform", `translate(${half}, ${half})`);

	const color = d3
		.scaleOrdinal()
		.domain(data.map(d => d.name))
		.range([
			"#404293",
			"#D39647",
			"#336487",
			"#D3AF47",
			"#404293",
			"#D3C547",
			"#5D398F",
			"#D3AF47"
		]);

	const pie = d3
		.pie()
		.sort(null)
		.value(d => d.value);

	const arcs = pie(data);

	const arc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(fourth);

	const arcLabel = d3
		.arc()
		.innerRadius(labelOffset)
		.outerRadius(labelOffset);

	plotArea
		.selectAll("path")
		.data(arcs)
		.enter()
		.append("path")
		.attr("fill", d => color(d.data.name))
		.attr("stroke", "white")
		.attr("d", arc);

	const labels = plotArea
		.selectAll("text")
		.data(arcs)
		.enter()
		.append("text")
		.style("text-anchor", "middle")
		.style("alignment-baseline", "middle")
		.style("font-size", "20px")
		.attr("transform", d => `translate(${arcLabel.centroid(d)})`);

	labels
		.append("tspan")
		.attr("y", "-0.6em")
		.attr("x", 0)
		.style("font-weight", "bold")
		.text(d => `${d.data.name}`);

	labels
		.append("tspan")
		.attr("y", "0.6em")
		.attr("x", 0)
		.text(
			d => `${d.data.value} (${Math.round((d.data.value / total) * 100)}%)`
		);
};

const Pie = ({ data, id }) => {
	useEffect(() => {
		createGraph({ data, id });
	}, []);

	return <div className={`graph-entry-${id}`}></div>;
};

export default Pie;
