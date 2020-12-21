import vars from "./api-vars";
import axios from "axios";
import apiUrl from "../utils/api-url";
import client from "../utils/contentful";

const getLatestWinner = results =>
	results &&
	results.filter(r => !!r.position).sort((a, b) => a.position - b.position);

const WithSeries = Page => {
	const withSeries = props => <Page {...props} />;

	withSeries.getInitialProps = async ctx => {
		const { name } = ctx.query;

		console.log(name);

		try {
			const res = await client.getEntries({
				include: 2,
				"fields.race": name,
				content_type: vars.content_type.raceSeries
			});

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

			const [latestRace] =
				race.races &&
				race.races.length > 0 &&
				race.races.sort((a, b) => b.year - a.year);

			const getLatestWinnerByClass = classification => {
				const results = latestRace.results.filter(
					r => r.class.toLowerCase() === classification.toLowerCase()
				);

				return getLatestWinner(results);
			};

			const getLatestWinnerByGender = gender => {
				const results = latestRace.results.filter(
					r =>
						r.category.toLowerCase() === gender.toLowerCase() &&
						r.class !== "PAIR"
				);

				return getLatestWinner(results);
			};

			const getLatestOverallWinner = race => {
				const results = race.results.filter(r => r.class === "SOLO");

				return getLatestWinner(results);
			};

			const getModalWinners = () => {
				let winners = race.races.map(race => getLatestOverallWinner(race)[0]);

				// Create objects of winners races
				const winsObj = winners.reduce((acc, curr) => {
					return {
						...acc,
						[curr.name]: acc[curr.name] ? [...acc[curr.name], curr] : [curr]
					};
				}, {});

				// Sort in win order
				let [mostWinsRider] = Object.keys(winsObj).sort(
					(a, b) => winsObj[b].length - winsObj[a].length
				);

				// Get the highest wins count
				const mostWinsRiderQty = winsObj[mostWinsRider].length;

				if (mostWinsRiderQty <= 1) return false;

				// Check if there are multiple with the same amount of wins
				winners = Object.keys(winsObj).filter(
					winner => winsObj[winner].length === mostWinsRiderQty,
					[]
				);

				return winners.map(w => ({ name: w, races: winsObj[w] }));
			};

			const [pairAWinner, pairBWinner] = getLatestWinnerByClass("PAIR");
			const [mensWinner] = getLatestWinnerByGender("MEN");
			const [womensWinner] = getLatestWinnerByGender("WOMEN");
			const [latestWinner] = getLatestOverallWinner(latestRace);
			const mostWins = getModalWinners();

			return {
				race,
				mensWinner,
				womensWinner,
				latestWinner,
				mostWins,
				latestRace,
				pairsWinners: [pairAWinner, pairBWinner],
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
