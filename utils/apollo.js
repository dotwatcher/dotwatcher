import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	ssrMode: typeof window === "undefined",
	connectToDevTools: process.env.NODE_ENV !== "production",
	uri: "https://graphql.dotwatcher.cc",
	cache: new InMemoryCache(),

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
