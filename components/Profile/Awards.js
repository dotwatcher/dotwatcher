import awards from "../../lib/awards";
import { totalDistanceOfRaces } from "../../utils/distance";

import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import mq from "../../utils/media-query";

const Div = styled.div`
	${tachyons}
`;

const AwardInfo = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
`;

const Award = styled.div`
	position: relative;

	* {
		transition: all ease-in-out 0.3s;
	}

	&:hover {
		* {
			transition: all ease-in-out 0.3s;
		}

		img {
			opacity: 0.2;
		}

		${AwardInfo} {
			opacity: 1;
		}
	}
`;

const Awards = styled.div`
	display: grid;

	grid-template-columns: repeat(3, 1fr);

	${mq.smUp`
		grid-template-columns: repeat(6, 1fr);
	`}
`;

export default ({ profile }) => {
	const total = totalDistanceOfRaces(profile);

	const achievedAwards = awards.filter(award => award.distance <= total);

	{
		/*<p>All time distance {formatDistance(total)}</p>

			<p>Average Distance {formatDistance(averageDistance(props.profile))}</p>

			{uniqueYears(props.profile).map(year => (
				<p key={year}>
					{year} Distance{" "}
					{formatDistance(totalDistanceByYear({ races: props.profile, year }))}
				</p>
			))}*/
	}

	return (
		<Div>
			<Awards>
				{achievedAwards.map((award, ind) => (
					<Award key={ind}>
						<img src={award.roundal} title={award.name} alt={award.name} />

						<AwardInfo>
							<p>{award.name}</p>
						</AwardInfo>
					</Award>
				))}
			</Awards>
		</Div>
	);
};
