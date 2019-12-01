import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		// Find all results where name contains ${name}
		const { rows: results } = await client.query(
			`SELECT races.name AS racename, races.year FROM races WHERE races.name LIKE '%${name}%'`
			// `SELECT races.name AS racename, races.year FROM results, races WHERE races.name LIKE '%${name}%')`
		);
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
