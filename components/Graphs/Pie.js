import * as d3 from "d3";
import { useState, useEffect } from "react";

const createGraph = ({ re, data }) => {
	const size = 500;
	const fourth = size / 4;
	const half = size / 2;
	const labelOffset = fourth * 1.4;
	const total = data.reduce((acc, cur) => acc + cur.value, 0);

	const chart = d3
		.select(".graph-entry")
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

export default ({ data }) => {
	const nationalities = data.map(d => d.nationality).filter(n => n);
	var counts = {};

	nationalities.forEach(x => {
		counts[x] = (counts[x] || 0) + 1;
	});

	const sumData = Object.keys(counts).map(c => ({
		name: c,
		value: counts[c]
	}));

	if (sumData.length <= 1) return null;

	useEffect(() => {
		createGraph({ data: sumData });
	}, []);

	return (
		<div>
			<h4>Nationality</h4>
			<div className="graph-entry"></div>
		</div>
	);
};
