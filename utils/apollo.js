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
	},

	/**
	 * Disabled cache to allow for real time editing in Contentful
	 * https://stackoverflow.com/a/48549667/4020207
	 *  */
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "no-cache",
			errorPolicy: "ignore"
		},
		query: {
			fetchPolicy: "no-cache",
			errorPolicy: "all"
		}
	}
});

export default client;
