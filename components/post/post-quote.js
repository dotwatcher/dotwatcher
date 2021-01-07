import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "../embed";
import Image from "../image";
import widont from "../../utils/widont";
import quotes from "../../utils/quotes";
import BodyImage from "../image/markdown";
import AutoEmbed from "../embed/auto";

const P = styled.p`
	${tachyons}
`;
const Cite = styled.cite`
	${tachyons}
`;
const Blockquote = styled.blockquote`
	${tachyons}
`;

const Short = ({ data }) => {
	let body;
	if (data.body) {
		body = (
			<ReactMarkdown
				source={data.body}
				plugins={[shortcodes]}
				renderers={{
					shortcode: Embed,
					link: AutoEmbed,
					image: BodyImage
				}}
			/>
		);
	}
	return (
		<React.Fragment>
			{data.image ? <Image data={data.image.fields} /> : null}
			<Blockquote ma0 mt4 pl3 bl bw3 b__near_black>
				<P lh_title f3 fw6 ma0 pa0>
					{quotes(widont(data.title))}
				</P>
				<Cite lh_copy ma0 pa0>
					{body}
				</Cite>
			</Blockquote>
		</React.Fragment>
	);
};

Short.propTypes = {
	data: PropTypes.object.isRequired
};

export default Short;
