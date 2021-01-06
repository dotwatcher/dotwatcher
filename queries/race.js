import { gql } from "@apollo/client";

export const loadMoreQuery = gql`
	query race($slug: String, $limit: Int, $skip: Int) {
		keyEvents: contentType2WKn6YEnZewu2ScCkus4AsCollection(
			limit: $limit
			skip: $skip
			order: $order
			where: { keyPost: true, race: { slug: $slug } }
		) {
			total
			limit
			skip
			items {
				sys {
					id
					firstPublishedAt
				}
				title
			}
		}

		racePostsCollection: contentType2WKn6YEnZewu2ScCkus4AsCollection(
			limit: $limit
			skip: $skip
			order: $order
			where: { race: { slug: $slug } }
		) {
			total
			limit
			skip
			items {
				sys {
					firstPublishedAt
					id
				}
				title
				format
				body
				keyPost
				embed
				featuredImage {
					url
				}
			}
		}
	}
`;

export default race;
