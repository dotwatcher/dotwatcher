import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import shortcodes from 'remark-shortcodes';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../embed';
import Placeholder from '../placeholder';
import Wrapper from '../shared/wrapper';
import widont from '../../utils/widont';

const Div = styled.div`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Img = styled.img`${tachyons}`;

const Block = ({block, feature}) => {
	const Wrap = styled.div`
		margin: 0 var(--spacing-medium);
		@media screen and (min-width: 48em) {
			margin: 0 ${feature ? 'var(--spacing-extra-extra-large)': 'var(--spacing-extra-large)'};
		}
		p {
			margin: 0;
		}

		p + p {
			margin-top: 1rem;
		}

		blockquote {
			font-style: italic;
			border-left: .5rem solid var(--light-blue);
			padding-left: 1rem;
		}
	${tachyons}`;
	let heading = null;
	if (block.heading) {
		heading = (
			<Header measure_wide>
				<H2 f3 f2_ns fw6 ma0 mb3 lh_title>{widont(block.heading)}</H2>
			</Header>
		)
	}
	return (
		<Wrap margin mb4 className="cf">
			{ heading }
			<Div measure mh3 lh_copy f4 f3_ns>
				<ReactMarkdown
					source={block.words}
					plugins={[shortcodes]}
					renderers={{shortcode: Embed}}
				/>
			</Div>
		</Wrap>
	);
};

Block.propTypes = {
	block: PropTypes.object.isRequired,
	feature: PropTypes.bool
};

Block.defaultProps = {
	feature: false
}

export default Block;
