import P from "@Components/UI/P";
import H4 from "@Components/UI/H4";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";

const Events = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;

	li + li {
		border-top: 1px solid ${colors.lightgrey};
		padding-top: ${dim()};
	}
`;

const KeyEvents = ({ events }) => {
	const { asPath, query } = useRouter();

	return (
		<Events>
			{events.items.map((event, ind) => (
				<li>
					<P>{event.title}</P>
					<P>
						<Link
							href={`/race/${query.slug}?reverse=${query.reverse}#${event.sys.id}`}
							passHref
							shallow
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
		</Events>
	);
};

export default KeyEvents;
