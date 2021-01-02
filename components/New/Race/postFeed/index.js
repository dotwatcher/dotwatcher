import ReactMarkdown from "react-markdown";
import moment from "moment";
import Short from "./short";
import styled from "styled-components";
import mq from "@Utils/media-query";
import dim from "@Utils/dim";
import { Fragment } from "react";

const Post = ({ item, ...props }) => {
	// if (item.format === "Long") {
	// 	return <Long {...props} />;
	// }
	// else if (item.format === "Quote") {
	// 	return <Quote {...props} />;
	// } else if (item.format === "Embed") {
	// 	return <Embed {...props} />;
	// } else if (item.format === "Photo") {
	// 	return <Photo {...props} />;
	// }

	return <Short {...props} />;
};

const Posts = styled.div`
	margin-top: ${dim()};

	${mq.mdUp`
		overflow: scroll;
		max-height: 96vh;
	`};
`;

const Feed = ({ posts }) => {
	// console.log(posts);

	return (
		<Posts>
			{posts.items.map((item, id) => (
				<Fragment>
					{console.log(item)}
					<a id={item.sys.id}></a>
					<Post {...item} />
				</Fragment>
			))}
		</Posts>
	);
};

export default Feed;
