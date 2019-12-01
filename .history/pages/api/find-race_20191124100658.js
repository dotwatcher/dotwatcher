const findRace = async (req, res) => {
	const client = await pool.connect();
	const { name } = req.query;

	try {
		const { rows: results } = await client.query(
			`${baseQuery} races.name LIKE '%${name}%'`
		);
		res.json({ results });
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
};
