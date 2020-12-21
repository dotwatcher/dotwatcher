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

const RiderAwards = ({ awards = [] }) => {
	return (
		<Div>
			<Awards>
				{awards.map((award, ind) => (
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

export default RiderAwards;
