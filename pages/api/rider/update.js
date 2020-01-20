import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();

	switch (req.method) {
		case "PATCH":
			const { auth_id, rider_name } = req.query;

			try {
				const results = await client.query(
					`UPDATE riders SET auth_id = '${auth_id}' WHERE riders.name = '${rider_name}'`
				);

				res.json({ results });
			} catch (error) {
				res.json({ error });
			} finally {
				client.release();
			}

			break;

		default:
			res.status(405).end();
			break;
	}
}
