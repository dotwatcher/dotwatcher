import {
	totalDistanceOfRaces,
	totalDistanceByYear,
	uniqueYears,
	averageDistance,
	formatDistance,
	addArray
} from "../../utils/distance";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";

import BarGraph from "../../components/Graphs/Bar";

export default props => {
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
		<BarGraph
			data={data}
			totalDistance={total}
			averageAnnualDistance={averageDistance(props.profile)}
		/>
	);
};
