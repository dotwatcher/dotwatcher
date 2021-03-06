import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		let { rows: results } = await client.query(
			`select distinct
				riders.name,
				array_agg(riders.id) as id
			from
				riders
			where
				lower(riders.name) like lower('%${name}%') 
			group by 
				riders.name
			limit 
				25
			`
		);

		results = results.map(res => ({ ...res, id: res.id[0] }));

		res.json(results);
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
