import pool from "../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { slug, year } = req.query;

	try {
		const { rows: results } = await client.query(
			`select * from races where races.slug = '${slug}' and races.year = ${year}`
		);
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
