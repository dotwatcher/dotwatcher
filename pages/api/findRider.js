import pool from '../../database'

export default async function handle(req, res) {
  const client = await pool.connect()
  const { name } = req.query

  try {
    const { rows: results } = await client.query(`SELECT id, riders.name FROM riders WHERE riders.name = '${name}'`) || []
    res.json(results)
  } catch (error) {
    res.json(error)
  } finally {
    client.release()
  }
}
