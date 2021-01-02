import Button from "@Components/UI/Button";
import A from "@Components/UI/A";
import P from "@Components/UI/P";
import { Fragment } from "react";
import moment from "moment";
import styled, { css } from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import Section from "@Components/UI/Section";
import IFrame from "@ComponentsNew/IFrame";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Buttons = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	max-width: 500px;
	margin: ${dim()} auto 0;
`;

const IFrameWrap = styled.div`
	transition: all ease-in-out 0.3s;

	${({ hideIframe }) =>
		hideIframe
			? css`
					height: 0;
					overflow: hidden;
			  `
			: css`
					height: initial;
					overflow: visible;
			  `};
`;

const Header = ({ race }) => {
	const { query } = useRouter();

	const initialMapState = query.showMap ? query.showMap > 0 : true;

	const [iframeVisible, setiframeVisible] = useState(initialMapState);

	const handleToggleMap = () => setiframeVisible(!iframeVisible);

	const toggleLabel = iframeVisible ? "Hide Map" : "Show Map";

	return (
		<Section>
			<IFrameWrap hideIframe={!iframeVisible}>
				<IFrame url={race.trackleadersRaceId} />
			</IFrameWrap>

			<Buttons>
				<Button secondary>Pin Map</Button>
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
