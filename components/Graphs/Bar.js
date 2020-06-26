import React from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Div = styled.div`
	svg {
		width: 100%;
		height: 600px;
	}

	.bar {
		fill: var(--blue);
	}

	.bar.active {
		fill: var(--light-blue);
	}

	text {
		font-size: 12px;
		fill: #fff;
	}

	path {
		stroke: gray;
	}

	line {
		stroke: gray;
	}

	line#limit {
		stroke: #fed966;
		stroke-width: 3;
		stroke-dasharray: 3 6;
	}

	.grid path {
		stroke-width: 0;
	}

	.grid .tick line {
		stroke: #9faaae;
		stroke-opacity: 0.3;
	}

	text.divergence {
		font-size: 12px;
		fill: #2f4a6d;
	}

	text.value {
		font-size: 12px;
	}

	text.title {
		font-size: 22px;
		font-weight: 600;
		fill: var(--blue);
	}

	text.label {
		font-size: 12px;
		font-weight: 400;
		fill: var(--blue);
	}

	text.source {
		font-size: 10px;
	}

	.axis text {
		fill: var(--blue);
	}
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.dataset = [100, 200, 300, 400, 500];
	}

	componentDidMount() {
		const { data } = this.props;

		const margin = 80;
		const width = 1000 - 2 * margin;
		const height = 600 - 2 * margin;

		const svg = d3.select(this.myRef.current).append("svg");

		const chart = svg
			.append("g")
			.attr("transform", `translate(${margin}, ${margin})`);

		const xScale = d3
			.scaleBand()
			.range([0, width])
			.domain(data.map(s => s.year))
			.padding(0.3);

		const yScale = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, Math.max(...data.map(d => d.distance)) + 200]);

		// vertical grid lines
		// const makeXLines = () => d3.axisBottom().scale(xScale);

		const makeYLines = () => d3.axisLeft().scale(yScale);

		chart
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.attr("class", "axis x-axis")
			.call(d3.axisBottom(xScale));

		chart
			.append("g")
			.attr("class", "axis y-axis")
			.call(d3.axisLeft(yScale));

		// vertical grid lines
		// chart.append('g')
		//   .attr('class', 'grid')
		//   .attr('transform', `translate(0, ${height})`)
		//   .call(makeXLines()
		//     .tickSize(-height, 0, 0)
		//     .tickFormat('')
		//   )

		chart
			.append("g")
			.attr("class", "grid")
			.call(
				makeYLines()
					.tickSize(-width, 0, 0)
					.tickFormat("")
			);

		const barGroups = chart
			.selectAll()
			.data(data)
			.enter()
			.append("g");

		barGroups
			.append("rect")
			.attr("class", "bar")
			.attr("x", g => xScale(g.year))
			.attr("y", g => yScale(g.distance))
			.attr("height", g => height - yScale(g.distance))
			.attr("width", xScale.bandwidth())

			.on("mouseenter", function(actual, i) {
				d3.selectAll(".value").attr("opacity", 0);

				d3.select(this)
					.classed("active", true)
					.transition()
					.duration(300)
					.attr("x", a => xScale(a.year) - 5)
					.attr("width", xScale.bandwidth() + 10);

				d3.select(this)
					.append("text")
					.attr("class", "divergence")
					.attr("x", a => xScale(a.year) + xScale.bandwidth() / 2)
					.attr("y", a => yScale(a.distance) + 60)
					.attr("fill", "white")
					.attr("text-anchor", "middle");

				const y = yScale(actual.distance);

				chart
					.append("line")
					.attr("id", "limit")
					.attr("x1", 0)
					.attr("y1", y)
					.attr("x2", width)
					.attr("y2", y);

				barGroups
					.append("text")
					.attr("class", "divergence")
					.attr("x", a => xScale(a.year) + xScale.bandwidth() / 2)
					.attr("y", a => yScale(a.distance) + 30)
					.attr("fill", "white")
					.attr("text-anchor", "middle")
					.text((a, idx) => `${a.distance} Km`);
			})

			.on("mouseleave", function() {
				d3.select(this)
					.classed("active", false)
					.transition()
					.duration(300)
					.attr("opacity", 1)
					.attr("x", a => xScale(a.year))
					.attr("width", xScale.bandwidth());

				chart.selectAll("#limit").remove();
				chart.selectAll(".divergence").remove();
			});

		// barGroups
		// 	.append("text")
		// 	.attr("x", a => xScale(a.year) + xScale.bandwidth() / 2)
		// 	.attr("y", a => yScale(a.distance) + 30)
		// 	.attr("text-anchor", "middle")
		// 	.attr("class", "barValue")
		// 	.text(a => `${a.distance} Km`);

		svg
			.append("text")
			.attr("class", "label")
			.attr("x", -(height / 2) - margin)
			.attr("y", margin / 2.4)
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("Distance");

		svg
			.append("text")
			.attr("class", "label")
			.attr("x", width / 2 + margin)
			.attr("y", height + margin * 1.5)
			.attr("text-anchor", "middle")
			.text("Year");

		svg
			.append("text")
			.attr("class", "title")
			.attr("x", width / 2 + margin)
			.attr("y", 40)
			.attr("text-anchor", "middle")
			.text("Annual Race Distances");
	}

	render() {
		return <Div ref={this.myRef}></Div>;
	}
}
export default App;
