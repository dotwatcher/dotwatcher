import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Map = styled.iframe`${tachyons}`;

const Iframe = ({raceID}) => (
	<Map w_100 vh_100 pt5 ba bw0 src={`http://trackleaders.com/${raceID}f.php`} frameborder="0"/>
);

Iframe.propTypes = {
	raceID: PropTypes.string.isRequired
};

export default Iframe;
