import shortcodes from "remark-shortcodes";
import ReactMarkdown from "react-markdown";
import { Image, ShortCode, Link } from "@ComponentsNew/Markdown";

const Short = ({ body }) => (
	<ReactMarkdown
		source={body}
		plugins={[shortcodes]}
		escapeHtml
		renderers={{
			shortcode: ShortCode,
			link: Link,
			image: Image
		}}
	/>
);

export default Short;
