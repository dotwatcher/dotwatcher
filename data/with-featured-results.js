import { createClient } from "contentful";
import vars from "./api-vars";
import Axios from "axios";
import apiUrl from "../utils/api-url";
import client from "../utils/contentful";

const query = {
	"sys.id": vars.pages.featuredResults,
	include: 2
};

const WithFeaturedResults = Page => {
	const withFeaturedResults = props => <Page {...props} />;

	withFeaturedResults.getInitialProps = async ctx => {
		try {
			const resultsResponse = await client.getEntries(query);

			const { items } = resultsResponse;

			const [item] = items;

			const { fields } = item;

			const raceNames = fields.races.map(race => race.fields.race);

			const races = async () => {
				const { data } = await Axios({
					method: "get",
					url: apiUrl("/api/featured-races", ctx.req),
					data: raceNames
				});

				return data;
			};

			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
				fields,
				races: await races()
			};
		} catch (e) {
			console.log(e);
			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
			};
		}
	};

	return withFeaturedResults;
};

export default WithFeaturedResults;
