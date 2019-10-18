import pool from '../../database'

export default async function handle(req, res) {
  const client = await pool.connect()
	const { slug, year } = req.query

  try {
    const { rows: results } = await client.query(`SELECT riders.name, races.name AS racename, races.year, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND races.slug = '${slug}' AND races.year = ${year}`)
    res.json({ results })
  } catch (error) {
    res.json({ error })
  } finally {
    client.release()
  }
}
