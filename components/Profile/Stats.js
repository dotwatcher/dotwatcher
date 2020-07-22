import {
	totalDistanceOfRaces,
	totalDistanceByYear,
	uniqueYears,
	averageDistance
} from "../../utils/distance";

import styled from "styled-components";

import BarGraph from "../../components/Graphs/Bar";

const Div = styled.div`
	margin-top: var(--spacing-extra-large);
	max-width: 900px;
	margin: 0 auto;
`;

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
		<Div>
			<BarGraph
				data={data}
				totalDistance={total}
				averageAnnualDistance={averageDistance(props.profile)}
			/>
		</Div>
	);
};
