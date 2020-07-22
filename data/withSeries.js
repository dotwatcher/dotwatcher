import vars from "./api-vars";
import axios from "axios";
import apiUrl from "../utils/api-url";
import client from "../utils/contentful";

const WithSeries = Page => {
	const withSeries = props => <Page {...props} />;

	withSeries.getInitialProps = async ctx => {
		const { name } = ctx.query;

		const query = {
			include: 2,
			"fields.race": name,
			content_type: vars.content_type.raceSeries
		};

		try {
			const res = await client.getEntries(query);

			const { items } = res;

			let [race] = items;

			const { data } = await axios({
				url: apiUrl(`/api/race-series`, ctx.req),
				method: "get",
				data: {
					name
				}
			});

			race = { ...race, races: data.races };

			return {
				race,
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
			};
		} catch (err) {
			console.log(err);

			return {
				...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
			};
		}
	};
	return withSeries;
};

export default WithSeries;
