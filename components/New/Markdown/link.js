import InstagramEmbed from "./instagramEmbed";

const tweetIdMatch = /status\/(\d+)/i;
const youtubeDomain = /youtu.?be./;
const youtubeIdMatch = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i;

const Default = ({ href, children }) => {
	const { hostname } = new URL(href);

	return (
		<a href={href} target={hostname !== "dotwatcher" ? "_blank" : "_self"}>
			{children[0] ? children[0] : href}
		</a>
	);
};

const Link = ({ href, children }) => {
	const isBrowser = typeof window !== "undefined";

	const tweetID = tweetIdMatch.exec(href);
	const youtubeID = youtubeIdMatch.exec(href);

	if (!isBrowser) {
		return <Default href={href}>{children}</Default>;
	}

	if (href.includes("twitter") && tweetID) {
		const { TwitterTweetEmbed } = require("react-twitter-embed");
		return <TwitterTweetEmbed tweetId={tweetID[1]} />;
	}

	if (href.includes("instagram.com/p/")) {
		return <InstagramEmbed href={href} />;
	}

	if (youtubeDomain.test(href)) {
		if (!youtubeID) return null;

		if (youtubeID.id) {
			return (
				<iframe
					width="560"
					height="315"
					style={{ maxWidth: "100%" }}
					src={`https://www.youtube.com/embed/${youtubeID.id}`}
					frameBorder="0"
					allowFullScreen
				/>
			);
		}

		return (
			<iframe
				width="560"
				height="315"
				style={{ maxWidth: "100%" }}
				src={`https://www.youtube.com/embed/${youtubeID[1]}`}
				frameBorder="0"
				allowFullScreen
			/>
		);
	}

	if (href.includes("docs.google.com")) {
		return (
			<iframe
				width="640"
				height="724"
				style={{ maxWidth: "100%" }}
				src={href}
				frameborder="0"
				marginheight="0"
				marginwidth="0"
			/>
		);
	}

	if (href.includes("ridewithgps.com/embeds")) {
		return (
			<iframe
				width="640"
				height="724"
				style={{ maxWidth: "100%" }}
				src={href}
				frameBorder="0"
				marginHeight="0"
				marginWidth="0"
			/>
		);
	}

	if (href.includes("player.vimeo.com")) {
		return (
			<iframe
				width="600"
				height="400"
				style={{ maxWidth: "100%" }}
				src={href}
				frameBorder="0"
				marginHeight="0"
				marginWidth="0"
			/>
		);
	}

	return <Default href={href}>{children}</Default>;
};

export default Link;
