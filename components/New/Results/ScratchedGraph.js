import Graph from "@Components/Graphs/Pie";
import styled from "styled-components";
import mq from "@Utils/media-query";

const Wrap = styled.div`
	${mq.mdUp`	
		display: flex;
		align-items: center;
	`}
`;

const countFromObj = array => {
	var counts = {};

	array.forEach(x => {
		counts[x] = (counts[x] || 0) + 1;
	});

	return counts;
};

const ScratchedGraph = ({ data }) => {
	let finishResult = data.map(d => d.result).filter(n => n);
	let finishLocations = data.map(d => d.finishlocation);

	finishResult = countFromObj(finishResult);
	finishLocations = countFromObj(finishLocations);

	const sumData = Object.keys(finishResult).map(c => ({
		name: c,
		value: finishResult[c]
	}));

	if (sumData.length < 1) return null;

	return (
		<Wrap>
			<Graph data={sumData} id="scratched" />

			<div>
				<p>Finish Locations:</p>

				{Object.keys(finishLocations).map(location => (
					<p>
						{location}: {finishLocations[location]} rider(s)
					</p>
				))}
			</div>
		</Wrap>
	);
};

export default ScratchedGraph;
