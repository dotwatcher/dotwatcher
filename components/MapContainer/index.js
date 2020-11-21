// Re Written from /components/map-container
// old version is in camel case

import { useState, useEffect, Fragment } from 'react';
import Iframe from "../iframe";
import PropTypes from "prop-types";
import { Div, A } from '../UI/Tachyons';
import styled from 'styled-components';
import Link from "next/link";
import Button from "../shared/button";
import { debounce } from 'debounce';
import mq from '../../utils/media-query';

const Wrapper = styled(Div)`
	/* top: ${({ offset }) => offset ? "inherit" : "89px"}; */
	padding: var(--spacing-small);
	position: relative;
`;

const Tips = styled(Div)`

	${mq.mdUp`
		position: absolute;
    bottom: -7px;
    transform: translate(-50%, 0);
    left: 50%;
	`}
`;

const Buttons = styled(Div)`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	background: var(--near-white);
	flex-direction: column;

	${mq.mdUp`
		flex-direction: unset;
	`}
`;

const MapWrap = styled(Div)`
	position: relative;
`

const MapContainer = ({ raceID, onLoad, offset }) => {

	const [showMap, setshowMap] = useState(false)

	const toggleMap = () => setshowMap(prev => !prev)

	const iframeLoaded = () => onLoad()

	
	useEffect(() => {
		const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > 1024;

		const checkViewport = debounce(() => {
			const desktop = isDesktop();
			setshowMap(isAlreadyOpen => isAlreadyOpen || desktop)
		}, 300)  

		window.addEventListener('resize', checkViewport);

		setshowMap(isDesktop())

		return () => window.removeEventListener('resize', checkViewport);
	}, [])

	return (
		<Wrapper>
		
			{showMap &&
				<MapWrap	>
					<Iframe
						onLoad={iframeLoaded}
						raceID={raceID}
						offset={offset}
					/>
					<Tips>
						<Link
							href="/page/6CO2ZfSWlyOkcQsG62iGaE"
							passHref
						>
							<A
								bg_black_80
								hover_bg_near_black
								f6
								lh_solid
								pa2
								near_white
								underline
								db
								mb2
							>
								Click here for tracker tips
							</A>
						</Link>
					</Tips>
				</MapWrap>
			}

			<Buttons>
				<Button dib w4 loading={false} onClick={toggleMap}>
					{showMap ? "Hide map" : "Show map"}
				</Button>
			</Buttons>
		</Wrapper>
	)
}

MapContainer.propTypes = {
	raceID: PropTypes.string,
	offset: PropTypes.bool
};

MapContainer.defaultProps = {
	raceID: "",
	offset: false,
	onLoad: () => {}
};

export default MapContainer;