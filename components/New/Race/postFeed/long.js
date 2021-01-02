import shortcodes from "remark-shortcodes";
import ReactMarkdown from "react-markdown";

export default ({ body, title }) => (
	<>
		<hr />
		<p>short post {title}</p>
		<ReactMarkdown
			source={body}
			plugins={[shortcodes]}
			escapeHtml={false}
			// renderers={{
			// 	shortcode: Embed,
			// 	link: AutoEmbed,
			// 	image: BodyImage
			// }}
		/>
	</>
);
