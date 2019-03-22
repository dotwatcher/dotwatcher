import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import shortcodes from 'remark-shortcodes';
import breaks from 'remark-breaks';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Embed from '../embed';
import widont from '../../utils/widont';

const Div = styled.div`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Img = styled.img`${tachyons}`;

const Block = ({block, feature}) => {
	const Wrap = styled.div`
		margin: 0 var(--spacing-medium);
		@media screen and (min-width: 48em) {
			margin: 0 ${feature ? 'var(--spacing-extra-extra-large)' : 'var(--spacing-extra-large)'} var(--spacing-large);
		}
		p {
			margin: 0;
		}

		p + p {
			margin-top: 1rem;
		}

		blockquote {
			margin: 1rem 0;
			padding-left: 1rem;
			font-style: italic;
			border-left: .5rem solid var(--light-blue);
		}
		a:link, a:visited {
			color: var(--blue)
		}
		a:hover {
			color: var(--light-blue)
		}

		img {
			max-width: 100%;
		}
	${tachyons}`;
	let heading = null;
	if (block.heading) {
		heading = (
			<Header measure_wide mh3>
				<H2 f3 f2_ns fw6 ma0 mb3 lh_title>{widont(block.heading)}</H2>
			</Header>
		)
	}
	return (
		<Wrap margin className="cf">
			{ heading }
			<Div measure mh3 lh_copy f5 f4_ns>
				<ReactMarkdown
					source={block.words}
					plugins={[shortcodes, breaks]}
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
