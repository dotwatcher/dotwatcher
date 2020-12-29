import vars from "../data/api-vars";
import { createClient } from "contentful";

const client = createClient({
	space: vars.space,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export default client;
