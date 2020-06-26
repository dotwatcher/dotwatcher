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
	const data = uniqueYears(props.profile).reduce((acc, curr, index) => {
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

	return (
		<div>
			<p>
				All time distance {formatDistance(totalDistanceOfRaces(props.profile))}
			</p>

			<p>Average Distance {formatDistance(averageDistance(props.profile))}</p>

			{uniqueYears(props.profile).map(year => (
				<p key={year}>
					{year} Distance{" "}
					{formatDistance(totalDistanceByYear({ races: props.profile, year }))}
				</p>
			))}

			<BarGraph data={data} />
		</div>
	);
};
