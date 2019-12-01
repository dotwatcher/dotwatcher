import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		// Find all results where name contains ${name}
		// Order by name, year
		// pass racename, race year, race slug, race length, race id
		const { rows: results } = await client.query(
			`SELECT races.name AS racename, races.year, array_agg(slug) as slugs, array_agg(length) as lengths, array_agg(id) as ids, array_agg(slug) FROM races  WHERE LOWER(races.name) LIKE LOWER('%${name}%') GROUP BY races.name, races.year ORDER BY races.name`
		);

		debugger;
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
