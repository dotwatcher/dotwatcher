import {
	totalDistanceOfRaces,
	totalDistanceByYear,
	uniqueYears,
	averageDistance
} from "../../utils/distance";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

import BarGraph from "../../components/Graphs/Bar";

const Div = styled.div`
	margin-top: var(--spacing-extra-large);
	max-width: 900px;
	margin: 0 auto;
`;

const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const ProfileStats = ({ results, ...props }) => {
	if (!props.auth0Profile) {
		const handleClick = e => {
			e.preventDefault();

			props.handleUnclaimedProfile();
		};
		return (
			<P lh_copy f5 f4_l>
				More statistics will be available when this rider has claimed their
				profile. If that's you,{" "}
				<A link near_black hover_blue underline pointer onClick={handleClick}>
					sign up now
				</A>
				!
			</P>
		);
	}

	let data = uniqueYears(results).reduce((acc, curr, index) => {
		if (curr) {
			return [
				...acc,
				{
					index,
					year: curr,
					distance: totalDistanceByYear({ races: results, year: curr })
				}
			];
		}

		return acc;
	}, []);

	data = data.sort((a, b) => a.year - b.year);

	const total = totalDistanceOfRaces(results);

	return (
		<Div>
			<BarGraph
				data={data}
				totalDistance={total}
				averageAnnualDistance={averageDistance(results)}
			/>
		</Div>
	);
};

export default ProfileStats;
