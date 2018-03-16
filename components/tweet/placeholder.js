import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Div = styled.div`
	${tachyons}
	width: 500px;
`;

const P = styled.p`
	${tachyons}
`;

const Placeholder = ({title, body}) => (
	<Div  ba b__light_gray br2 pa3 h5 dt>
		<P f3 fw6 moon_gray ttu tracked lh_copy measure_wide dtc v_mid tc>Loading</P>
	</Div>
);

export default Placeholder;
