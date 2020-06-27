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

	.running-total {
		stroke: var(--green);
		fill: none;
		stroke-width: 1.5;
	}

	.average-distance {
		stroke: var(--light-red);
		fill: none;
		stroke-width: 1.5;
	}

	.total-distance-legend {
		fill: var(--green);
	}

	.average-distance-legend {
		fill: var(--light-red);
	}

	.current-distance-legend {
		fill: var(--blue);
	}
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.addRunningCountToSet = this.addRunningCountToSet.bind(this);
		this.setUpChart = this.setUpChart.bind(this);
		this.renderLegend = this.renderLegend.bind(this);
		this.renderAxis = this.renderAxis.bind(this);

		this.margin = 120;
		this.outerWidth = 1000;
		this.width = this.outerWidth - 2 * this.margin;
		this.height = 600 - 2 * this.margin;

		this.state = {
			data: []
		};
	}
	//
	addRunningCountToSet(data) {
		return data.reduce((acc, curr) => {
			const prevEntry = acc[acc.length - 1];
			const prevTally = prevEntry ? prevEntry.runningTotal : 0;
			return [
				...acc,
				{
					...curr,
					runningTotal: prevTally + curr.distance
				}
			];
		}, []);
	}

	async componentDidMount() {
		const { data } = this.props;

		await this.setState({ data: this.addRunningCountToSet(data) });

		this.setUpChart();
	}

	renderLegend(chart) {
		const legendX = 20;
		const legendY = (dim = 1) => 10 + 30 * dim;

		const circle = () => chart.append("circle").attr("r", 6);
		const text = () => chart.append("text");

		circle()
			.attr("cx", legendX)
			.attr("cy", legendY())
			.attr("class", "total-distance-legend");

		circle()
			.attr("class", "average-distance-legend")
			.attr("cx", legendX)
			.attr("cy", legendY(2));

		circle()
			.attr("class", "current-distance-legend")
			.attr("cx", legendX)
			.attr("cy", legendY(3));

		text()
			.attr("x", legendX + 20)
			.attr("y", legendY())
			.text("Cummulative Distance");

		text()
			.attr("x", legendX + 20)
			.attr("y", legendY(2))
			.text("Average Annual Distance");

		text()
			.attr("x", legendX + 20)
			.attr("y", legendY(3))
			.text("Yearly Total Distance");
	}

	renderAxis({ chart, svg }) {
		const { data } = this.state;
		const { width, height, outerWidth, margin } = this;

		const { totalDistance } = this.props;
		const xScale = d3
			.scaleBand()
			.range([0, width])
			.domain(data.map(s => s.year))
			.padding(0.3);

		const yScale = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, Math.max(...data.map(d => d.distance)) + 200]);

		const yScaleRight = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, totalDistance + 200]);

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

		chart
			.append("g")
			.attr("class", "axis y-axis-right")
			.attr("transform", `translate(${width}, 0)`)
			.call(d3.axisRight(yScaleRight));

		chart
			.append("g")
			.attr("class", "grid")
			.call(
				makeYLines()
					.tickSize(-width, 0, 0)
					.tickFormat("")
			);

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
			.attr("x", -(height / 2) - margin)
			.attr("y", this.outerWidth - 50)
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("Cummulative Distance");

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
			.text("Distances over time");

		return {
			xScale,
			yScale,
			yScaleRight
		};
	}

	renderBars({ xScale, yScale, chart }) {
		const { data } = this.state;
		const { width, height } = this;
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
	}

	renderTotalLine({ chart, xScale, yScaleRight }) {
		const { data } = this.state;
		const line = d3
			.line()
			.x(d => xScale(d.year))
			.y(d => yScaleRight(d.runningTotal))
			.curve(d3.curveCatmullRom.alpha(0.5));

		chart
			.append("path")
			.datum(data)
			.attr("class", "running-total")
			.attr("data-legend", "Cummulative Distance")
			.attr("d", line);
	}

	renderAverageLine({ chart, xScale, yScale }) {
		const { averageAnnualDistance } = this.props;
		const { data } = this.state;
		chart
			.append("path")
			.datum(data)
			.attr("class", "average-distance")
			.attr("data-legend", "Average Annual Disatnce")
			.attr(
				"d",
				d3
					.line()
					.x(d => xScale(d.year))
					.y(d => yScale(averageAnnualDistance))
			);
	}

	setUpChart() {
		const { margin } = this;

		const svg = d3.select(this.myRef.current).append("svg");

		const chart = svg
			.append("g")
			.attr("transform", `translate(${margin}, ${margin})`);

		this.renderLegend(svg);
		const { xScale, yScale, yScaleRight } = this.renderAxis({ chart, svg });
		this.renderBars({ chart, xScale, yScale });

		// Running Total line
		this.renderTotalLine({ chart, xScale, yScaleRight });

		// Average Annual Distance
		this.renderAverageLine({ chart, xScale, yScale });
	}

	render() {
		return <Div ref={this.myRef}></Div>;
	}
}
export default App;