// Re Written from /components/map-container
// old version is in camel case

import { useState, useEffect } from 'react';
import Iframe from "../iframe";
import PropTypes from "prop-types";
import { Div, A } from '../UI/Tachyons';
import styled from 'styled-components';
import Link from "next/link";
import Button from "../shared/button";
import { debounce } from 'debounce';

const Wrapper = styled(Div)`
	top: ${({ offset }) => offset ? "inherit" : "89px"};
	padding: var(--spacing-small);
`;

const Tips = styled(Div)`
	left: 50%;
	transform: translateX(-50%);
	bottom: var(--spacing-small);
`;

const Buttons = styled(Div)`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	background: var(--near-white);
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
		
			{showMap && <Iframe
				onLoad={iframeLoaded}
				raceID={raceID}
				offset={offset}
			/>}

			<Buttons>
				<Button dib w4 loading={false} onClick={toggleMap}>
					{showMap ? "Hide map" : "Show map"}
				</Button>
				
				<Tips absolute_l z_1 tc>
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
						>
							Click here for tracker tips
						</A>
					</Link>
				</Tips>
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