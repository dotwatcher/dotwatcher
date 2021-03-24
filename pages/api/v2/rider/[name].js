import pool from "@Database";

export default async function handle(req, res) {
	const client = await pool.connect();

	try {
		const { name } = req.query;

		const { rows: results } = await client.query(
			`SELECT 
          riders.name,
          riders.nationality,
          races.name AS racename,
          races.year,
          results.position,
          results.cap,
          results.class,
          results.days,
          results.hours,
          results.minutes,
          results.result,
          results.bike,
          results.category
        FROM
          results,
          riders,
          races
        WHERE
          riders.name = $1
        AND
          riders.id = results.riderid
        AND
          races.id = results.raceid`,
			[name]
		);

		if (results.length < 1) {
			res.status(404);
			res.json({
				status: 404,
				message: "Rider not found"
			});
		} else {
			res.json({ results });
		}
	} catch (error) {
		res.status(500);
		res.json({ error });
	} finally {
		client.release();
	}
}
