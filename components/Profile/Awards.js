import styled from "styled-components";
import H3 from "@Components/UI/H3";
import tachyons from "styled-components-tachyons";
import { currentYear } from "@Utils";
import mq from "@Utils/media-query";

const Div = styled.div`
	${tachyons}
`;

const Award = styled.div`
	position: relative;
`;

const Awards = styled.div`
	text-align: center;
	${mq.mdUp`
		display: flex;
		justify-content: space-around;
	`}
`;

const getAwardImage = type => {
	console.log(type);
	const _type = type.toLowerCase();
	if (["off-road", "mtb", "off road"].includes(_type)) {
		return "award-off-road";
	}

	if (["road"].includes(_type)) {
		return "award-road";
	}

	if (["gravel", "mixed terrain", "mixed"].includes(_type)) {
		return "award-gravel";
	}
};

const RiderAwards = ({ data }) => {
	const curerntYearAchievements = data.rider.annualDistances.filter(terrain => {
		return terrain.years.find(year => year.year === currentYear);
	});

	return (
		<Div>
			<Awards>
				{curerntYearAchievements.length > 0 ? (
					curerntYearAchievements.map((award, ind) => {
						const awardType = award.terrain;

						const image = getAwardImage(awardType);
						return (
							<Award key={ind}>
								<img
									src={`/static/images/${image}.svg`}
									title={award.name}
									alt={award.name}
								/>

								<p>{award.years[0].totalDistance} Km</p>
							</Award>
						);
					})
				) : (
					<H3>No results published for this year so far.</H3>
				)}
			</Awards>
		</Div>
	);
};

export default RiderAwards;
