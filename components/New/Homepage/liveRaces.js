import { useState } from "react";
import styled, { css } from "styled-components";
import colors from "@Utils/colors";
import H2 from "@Components/UI/H2";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Image from "next/image";
import Link from "next/link";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";

const Slides = styled.div`
	position: relative;
`;

const Slide = styled.article`
	opacity: 0;
	width: 100%;
	height: 0;
	transition: opacity 0.3s ease-in-out;
	position: relative;
	z-index: -1;

	${({ active }) =>
		active &&
		css`
			height: unset;
			opacity: 1;
			z-index: 1;
		`}
`;

const SlideDescription = styled.div`
	position: absolute;
	bottom: ${dim()};
	left: ${dim()};

	* {
		color: white;
	}

	${mq.mdUp`
	  width: 50%;
  `}
`;

const Tab = styled.button`
	flex-grow: 1;
	background-color: transparent;
	border: 1px solid ${colors.grey};
	border-radius: 2px;
	cursor: pointer;

	${({ active }) =>
		active &&
		css`
			box-shadow: inset 0px 0px 8px 0px rgba(151, 151, 151, 1);
		`}
`;
const Tabs = styled.nav`
	display: flex;
`;

const RaceSlide = ({ race, ind, ...props }) => (
	<Slide {...props}>
		<Image
			src={(race.heroImage.url || race.icon.url) + "?w=1600&h=900&fit=crop"}
			width={1600}
			height={900}
			title={race.title}
			priority={ind === 0}
		/>

		<SlideDescription>
			<H2>{race.title}</H2>

			<P>{race.shortDescription}</P>

			<P>
				<Link href={`/race/${race.slug}`}>
					<A title={`Read More - ${race.title}`}>Read More</A>
				</Link>
			</P>
		</SlideDescription>
	</Slide>
);

const LiveRaces = ({ liveRaces }) => {
	const count = liveRaces.items.length;

	if (count === 1) {
		return <RaceSlide race={liveRaces.items[0]} active />;
	}

	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<Tabs>
				{liveRaces.items.map((race, ind) => (
					<Tab
						key={ind}
						active={ind === activeTab}
						onClick={() => setActiveTab(ind)}
					>
						<p>{race.title}</p>
					</Tab>
				))}
			</Tabs>
			<Slides>
				{liveRaces.items.map((race, ind) => (
					<RaceSlide
						key={ind}
						ind={ind}
						race={race}
						active={ind === activeTab}
					/>
				))}
			</Slides>
		</div>
	);
};

export default LiveRaces;
