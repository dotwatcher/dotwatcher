import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import widont from "@Utils/widont";
import quotes from "@Utils/quotes";
import { useRouter } from "next/router";
import H1 from "@Components/UI/H1";
import { useState } from "react";

import {
	Image as BodyImage,
	ShortCode,
	Link as MarkdownLink
} from "@ComponentsNew/Markdown";

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
const A = styled.a`
	${tachyons}
`;
const Button = styled.button`
	border: 0;
	padding: 0;
	appearance: none;
	background-color: transparent;
	${tachyons}
`;

const Long = ({ data }) => {
	const router = useRouter();
	const [showMore, setShowMore] = useState(false);

	const toggleMore = () => {
		setShowMore(prev => !prev);
	};

	const contineRegEx = RegExp(/\[\[\s?continue\s?\]\]/, "gi");
	const shouldSplitText = contineRegEx.test(data.body);
	let splitText = null;
	let continueReading = null;
	let moreText = null;
	let showLess = null;

	if (shouldSplitText) {
		const splitTextMarker = data.body.match(contineRegEx)[0];
		splitText = data.body.split(splitTextMarker);
		continueReading = (
			<Button near_black hover_blue underline_hover onClick={toggleMore}>
				▼ Continue reading
			</Button>
		);
		showLess = (
			<Button near_black hover_blue underline_hover mt3 onClick={toggleMore}>
				▲ Show less
			</Button>
		);
		moreText = showMore ? (
			<ReactMarkdown
				source={splitText[1].trim()}
				plugins={[shortcodes]}
				escapeHtml={false}
				renderers={{
					shortcode: ShortCode,
					link: MarkdownLink,
					image: BodyImage
				}}
			/>
		) : null;
	}

	return (
		<React.Fragment>
			{data.image && <img url={data.image.url + "?w=800"} />}

			<H1>
				<Link
					href={`/race/${router.query.slug}?post=${data.sys.id}#posts`}
					passHref
				>
					<a title={data.title}>{data.title}</a>
				</Link>
			</H1>

			<div>
				<ReactMarkdown
					source={shouldSplitText ? splitText[0].trim() : data.body}
					plugins={[shortcodes]}
					escapeHtml={false}
					renderers={{
						shortcode: ShortCode,
						link: MarkdownLink,
						image: BodyImage
					}}
				/>

				{!showMore && continueReading}

				{moreText}

				{showMore && showLess}
			</div>
		</React.Fragment>
	);
};

Long.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default Long;
