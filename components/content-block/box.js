import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Wrapper from '../shared/wrapper';
import widont from '../../utils/widont';

const Div = styled.div`
	&:hover .dim {
		opacity: .6;
	}
${tachyons}`;
const H2 = styled.h2`
&:after {
	content: '';
	width: 50%;
	border-top: .125rem solid white;
	position: absolute;
	bottom: -1.5rem;
	left: 25%;
	height: 25%;
}
${tachyons}`;
const VerticallyCenter = styled.div`
	position: absolute;
	top: 50%;
	left: var(--spacing-medium);
	right: var(--spacing-medium);
	transform: translate(0, -50%);
	@media screen and (min-width: 64em) {
		left: var(--spacing-large);
		right: var(--spacing-large);
	}
${tachyons}`;
const P = styled.p`${tachyons}`;
const BGimage = styled.div`
	background-image: url(${props => props.bg}?w=600&h=600&fit=fill&fm=jpg&q=50);
	@media screen and (min-width: 64em) {
		background-image: url(${props => props.bg}?w=800&h=800&fit=fill&fm=jpg&q=50);
	}
 ${tachyons}`;

const Box = ({block}) => (
	<Wrapper w_100 w_50_ns mt4_ns mb5_ns className="cf">
		<Div aspect_ratio aspect_ratio__8x5 mb4 bg_near_black>
			<a href={block.link}>
				<Div aspect_ratio__object z_1>
					<VerticallyCenter>
						<H2 f3 f2_l ttu tracked white tc lh_solid ma0 mb4 relative>{widont(block.heading)}</H2>
						<P f4 white lh_copy tc ma0>{widont(block.words)}</P>
					</VerticallyCenter>
				</Div>
				<BGimage o_80 o_100_l aspect_ratio__object z_0 cover bg_center className="dim" bg={block.image.fields.file.url}/>
			</a>
		</Div>
	</Wrapper>
);

Box.propTypes = {
	block: PropTypes.object.isRequired
};

export default Box;
