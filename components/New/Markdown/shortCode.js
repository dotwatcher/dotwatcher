import Instagram from "react-instagram-embed";

const Embed = ({ identifier, attributes }) => {
	const isBroswer = typeof window !== "undefined";

	if (!isBroswer) {
		return null;
	}

	if (identifier === "tweet") {
		const { TwitterTweetEmbed } = require("react-twitter-embed");
		return <TwitterTweetEmbed tweetId={attributes.id} />;
	}

	if (identifier === "youtube") {
		return (
			<iframe
				width="560"
				height="315"
				style={{ maxWidth: "100%" }}
				src={`https://www.youtube.com/embed/${attributes.id}`}
				frameBorder="0"
				allowFullScreen
			/>
		);
	}

	if (identifier === "iframe") {
		return attributes.iframe;
	}
};

export default Embed;
