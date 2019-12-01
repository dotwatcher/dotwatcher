import pool from "../../../database";

export default async function handle(req, res) {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		// Find all results where name contains ${name}
		// Order by name, year
		// pass racename, race year, race slug, race length, race id
		const { rows: races } = await client.query(
			`SELECT races.name AS racename, races.year, array_agg(races.slug) as slug, array_agg(races.length) as length, array_agg(races.id) as id FROM races WHERE LOWER(races.name) LIKE LOWER('%${name}%') GROUP BY races.name, races.year ORDER BY races.name`
		);

		const filteredRaces = [];

		races = races.map(race => {
			let events = races.reduce((acc, curr) => {
				if (!curr) return acc;

				if (curr.racename === race.racename && curr.slug !== race.slug) {
					return [
						...acc,
						{
							...curr,
							slug: curr.slug[0],
							length: curr.length[0],
							id: curr.id[0]
						}
					];
				}

				return acc;
			}, []);

			return {
				name: race.racename,
				events
			};
		});

		races.forEach(r => {
			const picked = filteredRaces.find(e => e.racename === r.racename);
			if (picked) return;
			filteredRaces.push(r);
		});

		res.json(filteredRaces);
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
