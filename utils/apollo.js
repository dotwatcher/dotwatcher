import { ApolloClient, InMemoryCache } from "@apollo/client";
console.log("access token content ", process.env.CONTENTFUL_GRAPHQL_TOKEN);
const client = new ApolloClient({
	ssrMode: true,
	uri:
		"https://graphql.contentful.com/content/v1/spaces/" +
		process.env.CONTENTFUL_SPACE_ID,
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${process.env.CONTENTFUL_GRAPHQL_TOKEN}`
	}
});

export default client;
