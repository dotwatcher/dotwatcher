const pool = require('../../database')

export default async function handle(req, res) {
  const client = await pool.connect()

  try {
    // const { rows: results } = await client.query(`select column_name,data_type from information_schema.columns where table_name = 'results';`)
    // const { rows: results } = await client.query(`TRUNCATE races;`)
    const { rows: results } = await client.query(`SELECT name, array_agg(slug) as slugs, array_agg(year) as years FROM races GROUP BY name;`)
    // const { rows: results } = await client.query(
    //   `ALTER TABLE races ALTER COLUMN length TYPE INT USING length::integer;`
    //   )

    res.json(results)
  } catch (error) {
    res.json({ error })
  }
  await client.release()
}
