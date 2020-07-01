import pool from "../../database";

export default async function handle(req, res) {
	const client = await pool.connect();

	let { name } = req.body;

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
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
