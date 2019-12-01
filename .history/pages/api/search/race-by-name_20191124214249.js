import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		const { rows: results } = await client.query(
			`SELECT races.name AS racename, races.year FROM results, races WHERE races.name LIKE '%${name%')`
		);
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
