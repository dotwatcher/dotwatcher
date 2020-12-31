import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	ssrMode: true,
	uri:
		"https://graphql.contentful.com/content/v1/spaces/" +
		process.env.CONTENTFUL_SPACE_ID,
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${process.env.CONTENTFUL_GRAPHQL_URL}`
	}
});

export default client;
