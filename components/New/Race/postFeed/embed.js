import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "@ComponentsNew/Embed";
import widont from "@Utils/widont";

const Div = styled.div`
	${tachyons}
`;

const Post = ({ data }) => {
	let embed;

	if (data.embed) {
		if (data.embed.includes("twitter") > 0) {
			embed = (
				<Embed
					identifier="tweet"
					attributes={{
						id: data.embed.match(
							/https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
						)[3]
					}}
				/>
			);
		} else if (data.embed.includes("youtube") > 0) {
			embed = (
				<Embed
					identifier="youtube"
					attributes={{
						id: data.embed.match(
							/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
						)[5]
					}}
				/>
			);
		} else if (data.embed.includes("instagram") > 0) {
			embed = (
				<Embed
					identifier="instagram"
					attributes={{ url: data.embed.split("?")[0] }}
				/>
			);
		} else if (data.embed.includes("iframe") > 0) {
			embed = <Embed identifier="iframe" attributes={{ iframe: data.embed }} />;
		} else {
			embed = null;
		}
	}

	return (
		<React.Fragment>
			{data.featuredImage && (
				<img
					src={data.featuredImage.url + "?w=800"}
					alt={data.title}
					title={data.title}
				/>
			)}

			{embed}
			<Div lh_copy mv4>
				{data.title}
			</Div>
		</React.Fragment>
	);
};

export default Post;
