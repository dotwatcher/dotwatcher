import P from "@Components/UI/P";
import H4 from "@Components/UI/H4";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import Button from "@Components/UI/Button";

const Events = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;

	li + li {
		border-top: 1px solid ${colors.lightgrey};
		padding-top: ${dim()};
	}
`;

const KeyEvents = ({ events, showLoadMoreEvents, handleLoadMore }) => {
	const { query } = useRouter();

	return (
		<Events>
			{events.map((event, ind) => (
				<li key={ind}>
					<P>{event.title}</P>
					<P>
						<Link
							href={`/race/${query.slug}?reverse=${query.reverse}&post=${event.sys.id}#events`}
							passHref
						>
							<a>
								{moment(
									new Date(event.sys.firstPublishedAt),
									"YYYMMDD"
								).fromNow()}
							</a>
						</Link>
					</P>
				</li>
			))}

			{showLoadMoreEvents && (
				<Button onClick={handleLoadMore}>Load More</Button>
			)}
		</Events>
	);
};

export default KeyEvents;
