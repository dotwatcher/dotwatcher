import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	let { name } = req.query;

	name = `%${name}%`;

	try {
		const { rows: results } = await client.query(
			`SELECT 
				riders.name,
				riders.nationality,
				riders.auth_id,
				races.name AS racename,
				races.year,
				races.slug,
				races.length,
				results.position,
				results.cap,
				results.class,
				results.days,
				results.hours,
				results.minutes,
				results.result,
				results.bike,
				results.category,
				results.finishlocation
			FROM
				results,
				riders,
				races
			WHERE
				riders.id = results.riderid
			AND
				races.id = results.raceid
			AND
				LOWER(riders.name) LIKE LOWER($1)`,
			[name]
		);

		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
