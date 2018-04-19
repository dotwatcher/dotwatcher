import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const P = styled.p`${tachyons}`;

const Placeholder = ({raceID, ...styles}) => {
	const Div = styled.div`
		${tachyons}
		${styles ? '' : 'width: 500px;'}
	`;
	return (
		<Div ba b__light_gray br2 pa3 h5 dt {...styles}>
			<P f3 fw6 moon_gray ttu tracked lh_copy measure_wide dtc v_mid tc>{raceID}</P>
		</Div>
	);
};

Placeholder.propTypes = {
	raceID: PropTypes.string
};

Placeholder.defaultProps = {
	raceID: 'Loading'
};

export default Placeholder;
