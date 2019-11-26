import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		const { rows: results } = await client.query(
			`select riders.name, riders.id from riders where lower(riders.name) like lower('%${name}%') limit 25`
		);
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
