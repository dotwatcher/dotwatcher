import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const P = styled.p`${tachyons}`;

const Placeholder = ({...styles}) => {
	const Div = styled.div`
		${tachyons}
		${styles ? '' : 'width: 500px;'}
	`;
	return (
		<Div ba b__light_gray br2 pa3 h5 dt {...styles}>
			<P f3 fw6 moon_gray ttu tracked lh_copy measure_wide dtc v_mid tc>Loading</P>
		</Div>
	)
};

export default Placeholder;
