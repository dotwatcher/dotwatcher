import Button from "@Components/UI/Button";
import A from "@Components/UI/A";
import P from "@Components/UI/P";
import styled, { css } from "styled-components";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Section from "@Components/UI/Section";
import IFrame from "@ComponentsNew/IFrame";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import color from "@Utils/colors";
import Image from "next/image";

const MapWrapper = styled.div`
	background-color: white;

	${({ mapPinned }) =>
		mapPinned &&
		css`
			padding: ${dim(5)} ${dim(1)} ${dim(1)};
			position: fixed;
			width: 500px;
			left: 15px;
			top: 15px;
			z-index: 1;
			box-shadow: -4px 10px 19px 0px rgba(151, 151, 151, 1);
		`}

	${({ hideIframe }) =>
		hideIframe
			? css`
					height: 0;
					overflow: hidden;
					padding: 0;

					${CloseMap} {
						display: none;
					}
			  `
			: css`
					height: initial;
					overflow: visible;
			  `};
`;

const CloseMap = styled(Button)`
	position: absolute;
	top: 15px;
	left: 15px;

	&:hover {
		background-color: white;
		color: ${color.primary};
	}
`;

const PinMap = styled(Button)`
	${mq.smDown`
		display: none;
	`}
`;

const Buttons = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	max-width: 500px;
	margin: ${dim()} auto 0;
`;

const IFrameWrap = styled.div`
	transition: all ease-in-out 0.3s;
`;

const Header = ({ race, mapPinned, setMapPinned }) => {
	const { query } = useRouter();

	const initialMapState = query.showMap ? query.showMap > 0 : true;

	const [iframeVisible, setiframeVisible] = useState(initialMapState);

	const handleToggleMap = () => setiframeVisible(!iframeVisible);

	const toggleLabel = iframeVisible ? "Hide Map" : "Show Map";

	return (
		<Section>
			<MapWrapper mapPinned={mapPinned} hideIframe={!iframeVisible}>
				<IFrameWrap>
					{mapPinned && (
						<CloseMap secondary onClick={() => setMapPinned(false)}>
							<Image
								src="/static/icons/full-screen.svg"
								width={25}
								height={25}
							/>
						</CloseMap>
					)}
					<IFrame url={race.trackleadersRaceId} />
				</IFrameWrap>
			</MapWrapper>

			<Buttons>
				{!mapPinned && iframeVisible && (
					<PinMap secondary onClick={() => setMapPinned(true)}>
						Pin Map
					</PinMap>
				)}

				<Button secondary onClick={handleToggleMap} title={toggleLabel}>
					{toggleLabel}
				</Button>
				<P>
					<Link href="/page/6CO2ZfSWlyOkcQsG62iGaE" passHref>
						<A title="Tracking Tips">Tracking Tips</A>
					</Link>
				</P>
			</Buttons>
		</Section>
	);
};

export default Header;
