import React from "react";
import styled from "styled-components";

import dim from "@Utils/dim";

const Div = styled.div`
	margin-bottom: ${dim(2)};
`;

const MarkdownImage = ({ src, alt }) => {
	const videoregex = /^.*.(mp4|webm|ogg)$/;
	const format = src.match(/\.png$/) ? "&fm=jpg" : "";

	if (videoregex.test(src)) {
		return (
			<video width="100%" controls>
				<source src={src} /> Your browser does not support the video tag.
			</video>
		);
	}

	return (
		<Div>
			<img alt={alt} title={alt} src={`${src}?${format}&q=60&w=850`} />
		</Div>
	);
};

export default MarkdownImage;
