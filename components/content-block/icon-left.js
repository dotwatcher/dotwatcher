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
import widont from "../../utils/widont";
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
const ImageWrap = styled.div`
	${tachyons}
`;
const WordsWrap = styled.div`
	${tachyons}
`;

const Block = ({ block }) => {
	return (
		<Wrapper mhw_100 w_50_ns ph4 mt4_ns mb5_ns className="with-divider cf">
			<WordsWrap fl_ns pr3 w_100>
				<ImageWrap fl w_20>
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
				<Div fl w_80>
					{block.heading ? (
						<H2 lh_title f3 fw6 ma0 mb4>
							{widont(block.heading)}
						</H2>
					) : (
						<H2 lh_title f3 fw6 ma0 mb4>
							{widont(block.words)}
						</H2>
					)}
					{block.heading ? (
						<Div measure lh_copy f4 mb4>
							<ReactMarkdown
								source={block.words}
								plugins={[shortcodes]}
								renderers={{
									image: BodyImage,
									shortcode: Embed,
									link: AutoEmbed
								}}
							/>
						</Div>
					) : null}
				</Div>
			</WordsWrap>
		</Wrapper>
	);
};

Block.propTypes = {
	block: PropTypes.object.isRequired
};

export default Block;
