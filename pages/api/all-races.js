import pool from '../../database'

export default async function handle(req, res) {
  const client = await pool.connect()

  try {
    const { rows: results } = await client.query(`SELECT name, array_agg(slug) as slugs, array_agg(year) as years FROM races GROUP BY name;`)
    res.json(results)
  } catch (error) {
    res.json({ error })
  } finally {
    client.release()
  }
}
