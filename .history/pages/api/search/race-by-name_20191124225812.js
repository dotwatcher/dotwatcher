import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		// Find all results where name contains ${name}
		// Order by name, year
		// pass racename, race year, race slug, race length, race id
		const { rows: races } = await client.query(
			`SELECT races.name AS racename, races.year, array_agg(races.slug) as slug, array_agg(races.length) as length, array_agg(races.id) as id FROM races WHERE LOWER(races.name) LIKE LOWER('%trans%') GROUP BY races.name, races.year ORDER BY races.name`
		);

		const formattedRaces = races.map(race => ({
			name: race.racename,
			events: {
				id: race.id[0],
				length: race.length[0],
				slug: race.slug[0],
				years: races
					.filter(
						otherRace =>
							otherRace.racename === race.racename &&
							otherRace.slug !== race.slug
					)
					.map(race => race.year)
			}
		}));

		res.json(formattedRaces);
		// res.json(races);
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
