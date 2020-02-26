import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "../embed";
import AutoEmbed from "../embed/auto";
import Placeholder from "../placeholder";
import Wrapper from "../shared/wrapper";
import BodyImage from "../image/markdown";

const Div = styled.div`
	p {
		margin: 0;
	}
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const Img = styled.img`
	${tachyons}
`;

const Block = ({ block }) => {
	const ImageWrap = styled.div`
		float: ${block.layout === "Image right" ? "right" : "left"};
		@media screen and (min-width: 30em) and (max-width: 64em) {
			padding: ${block.layout === "Image right"
				? "0 0 0 var(--spacing-medium)"
				: "0 var(--spacing-medium) 0 0"};
		}
		@media screen and (min-width: 64em) {
			padding: ${block.layout === "Image right"
				? "0 0 0 var(--spacing-large)"
				: "0 var(--spacing-large) 0 0"};
		}
		${tachyons}
	`;
	const WordsWrap = styled.div`
		@media screen and (min-width: 30em) and (max-width: 64em) {
			padding: ${block.layout === "Image right"
				? "0 var(--spacing-medium) 0 0"
				: "0 0 0 var(--spacing-medium)"};
		}
		@media screen and (min-width: 64em) {
			padding: ${block.layout === "Image right"
				? "0 var(--spacing-large) 0 0"
				: "0 0 0 var(--spacing-large)"};
		}
		${tachyons}
	`;
	return (
		<Wrapper
			mh5
			mb4
			mb5_ns
			bb
			bw1
			pb4_ns
			b__light_gray
			className="with-divider cf"
		>
			<ImageWrap w_100 w_40_ns w_50_l pb4>
				{block.image ? (
					<Img
						mw_100
						src={block.image.fields.file.url}
						alt={block.image.fields.description}
					/>
				) : (
					<Placeholder w_100 h_100 pv6 bg_light_gray />
				)}
			</ImageWrap>
			<WordsWrap fl w_100 w_60_m w_50_l>
				<H2 f2 fw6 mt0 mb3>
					{block.heading}
				</H2>
				<Div fl measure lh_copy f4>
					<ReactMarkdown
						source={block.words}
						plugins={[shortcodes]}
						renderers={{
							shortcode: Embed,
							link: AutoEmbed,
							image: BodyImage
						}}
					/>
				</Div>
			</WordsWrap>
		</Wrapper>
	);
};

Block.propTypes = {
	block: PropTypes.object.isRequired
};

export default Block;
