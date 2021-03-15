import pool from "../../database";

export default async function handle(req, res) {
	const client = await pool.connect();

	let { name } = req.query;

	if (!name) {
		res.json({
			error: "No name passed in request body"
		});

		res.end();

		return;
	}

	try {
		const { rows: results } = await client.query(
			`select * from races where races.name = '${name}'`
		);

		const races = await Promise.all(
			results.map(async result => {
				const { rows } = await client.query(
					`SELECT riders.name, riders.nationality, races.slug, races.name AS racename, races.year, races.description, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category, results.finishlocation, results.notes FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND races.slug = '${result.slug}' AND races.year = ${result.year}`
				);

				return {
					...result,
					results: rows
				};
			})
		);

		res.json({ races });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
