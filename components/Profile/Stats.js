import {
	totalDistanceOfRaces,
	totalDistanceByYear,
	uniqueYears,
	averageDistance,
	formatDistance,
	addArray
} from "../../utils/distance";

import BarGraph from "../../components/Graphs/Bar";

export default props => {
	// const data = [{ index, date, value }]
	let data = uniqueYears(props.profile).reduce((acc, curr, index) => {
		if (curr) {
			return [
				...acc,
				{
					index,
					year: curr,
					distance: totalDistanceByYear({ races: props.profile, year: curr })
				}
			];
		}

		return acc;
	}, []);

	data = data.sort((a, b) => a.year - b.year);

	const total = totalDistanceOfRaces(props.profile);

	return (
		<div>
			{/*<p>All time distance {formatDistance(total)}</p>

			<p>Average Distance {formatDistance(averageDistance(props.profile))}</p>

			{uniqueYears(props.profile).map(year => (
				<p key={year}>
					{year} Distance{" "}
					{formatDistance(totalDistanceByYear({ races: props.profile, year }))}
				</p>
			))}*/}

			<BarGraph
				data={data}
				totalDistance={total}
				averageAnnualDistance={averageDistance(props.profile)}
			/>
		</div>
	);
};
