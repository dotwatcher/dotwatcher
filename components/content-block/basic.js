import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import breaks from "remark-breaks";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "../embed";
import AutoEmbed from "../embed/auto";
import BodyImage from "../image/markdown";
import widont from "../../utils/widont";
import slugify from "../../utils/slugify";

const Div = styled.div`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const Header = styled.header`
	${tachyons}
`;

const Block = ({ block, feature }) => {
	const Wrap = styled.div`
		margin: 0 var(--spacing-medium);
		@media screen and (min-width: 48em) {
			margin: 0
				${feature
					? "var(--spacing-extra-extra-large)"
					: "var(--spacing-extra-large)"}
				var(--spacing-large);
		}
		p {
			margin: 0;
		}

		h2,
		h3,
		h4,
		h5,
		strong {
			font-weight: 600;
		}

		p + p {
			margin-top: 1rem;
		}

		blockquote {
			margin: 1rem 0;
			padding-left: 1rem;
			font-style: italic;
			border-left: 0.5rem solid var(--light-blue);
		}
		a:link,
		a:visited {
			color: var(--blue);
		}
		a:hover {
			color: var(--light-blue);
		}

		img {
			max-width: 100%;
		}
		${tachyons}
	`;
	let heading = null;
	if (block.heading) {
		heading = (
			<Header measure_wide mh3>
				<H1 f3 f2_ns fw6 ma0 mb3 lh_title id={slugify(block.heading)}>
					{widont(block.heading)}
				</H1>
			</Header>
		);
	}

	return (
		<Wrap mr0 fl className="cf">
			{heading}
			<Div measure mh3 lh_copy f5 f4_ns>
				<ReactMarkdown
					source={block.words}
					plugins={[shortcodes, breaks]}
					renderers={{
						shortcode: Embed,
						link: AutoEmbed,
						image: BodyImage
					}}
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
};

export default Block;
