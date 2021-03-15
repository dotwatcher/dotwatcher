import pool from "@Database";

export default async function handle(req, res) {
	const client = await pool.connect();

	try {
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
        riders.id = results.riderid
      AND
        races.id = results.raceid`
		);
		res.json({ results });
	} catch (error) {
		res.status(500);
		res.json({ error });
	} finally {
		client.release();
	}
}
