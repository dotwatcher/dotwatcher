import pool from "@Database";

export default async function handle(req, res) {
	const client = await pool.connect();

	const { slug, year } = req.query;

	try {
		const { rows: results } = await client.query(
			`SELECT 
        riders.name,
        riders.nationality,
        races.name AS racename,
        races.year,
        races.description,
        results.position,
        results.cap,
        results.class,
        results.days,
        results.hours,
        results.minutes,
        results.result,
        results.bike,
        results.category,
        results.finishlocation,
        results.notes
      FROM
        results,
        riders,
        races
      WHERE
        riders.id = results.riderid
      AND
        races.id = results.raceid
      AND
        races.slug = $1
      AND
        races.year = $2`,
			[slug, year]
		);

		if (results.lenght < 1) {
			res.status(404);
			res.json({
				status: 404,
				messsage: `No race found with year "${year}" and "${slug}".`
			});
		} else {
			res.json({ results });
		}
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
