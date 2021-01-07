import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "../embed";
import Image from "../image";
import widont from "../../utils/widont";
import BodyImage from "../image/markdown";
import AutoEmbed from "../embed/auto";

const Div = styled.div`
	iframe {
		max-width: 100%;
	}
	img {
		max-width: 100%;
	}
	a:link {
		color: var(--blue);
	}
	a:hover {
		color: var(--light-blue);
	}
	${tachyons}
`;
const Short = ({ data }) => {
	let body;
	if (data.body) {
		body = (
			<Div lh_copy>
				<ReactMarkdown
					source={data.body}
					plugins={[shortcodes]}
					escapeHtml={false}
					renderers={{
						shortcode: Embed,
						link: AutoEmbed,
						image: BodyImage
					}}
				/>
			</Div>
		);
	}
	return (
		<React.Fragment>
			{data.image ? <Image data={data.image.fields} /> : null}
			{body ? body : null}
			<Div lh_copy mv4>
				{widont(data.title)}
			</Div>
		</React.Fragment>
	);
};

Short.propTypes = {
	data: PropTypes.object.isRequired
};

export default Short;
