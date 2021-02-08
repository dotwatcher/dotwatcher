import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	ssrMode: true,
	connectToDevTools: process.env.NODE_ENV !== "production",
	uri:
		"https://graphql.contentful.com/content/v1/spaces/" +
		process.env.CONTENTFUL_SPACE_ID,
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${process.env.CONTENTFUL_GRAPHQL_TOKEN}`
	}
});

export default client;
