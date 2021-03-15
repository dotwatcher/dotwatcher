import Graph from "@Components/Graphs/Pie";

const NationalityGraph = ({ data }) => {
	const nationalities = data.map(d => d.nationality).filter(n => n);
	const nullValues = data.map(d => d.nationality).filter(n => !n);
	var counts = {};

	nationalities.forEach(x => {
		counts[x] = (counts[x] || 0) + 1;
	});

	const sumData = Object.keys(counts).map(c => ({
		name: c,
		value: counts[c]
	}));

	if (sumData.length < 1) return null;

	return (
		<>
			<Graph data={sumData} id="nationality" />
			{nullValues.length > 0 && (
				<p>* {nullValues.length} entrants have no registered nationality</p>
			)}
		</>
	);
};

export default NationalityGraph;
