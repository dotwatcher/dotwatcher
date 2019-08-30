const pool = require('../../database')

export default async function handle(req, res) {
  const client = await pool.connect()

  const { name } = req.query

  try {
    // const { rows: results } = await client.query(`select column_name,data_type from information_schema.columns where table_name = 'results';`)
    // const { rows: results } = await client.query(`TRUNCATE riders;`)
    // const { rows: results } = await client.query(`SELECT * FROM riders;`)

    const { rows: results } = await client.query(`SELECT riders.name, races.name AS racename, races.year, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND riders.name = '${name}'`)

    // const { rows: results } = await client.query(
    //   `CREATE TYPE classification AS ENUM ('SOLO', 'PAIR');
    //    CREATE TYPE resultType AS ENUM ('FINISHED', 'SCRATCHED', 'DISQUALIFIED');
    //    CREATE TYPE bike AS ENUM ('TRADITIONAL_GEARED', 'FIXED', 'SINGLE_SPEED', 'TANDEM', 'UNICYCLE', 'VELOMOBILE');
    //    CREATE TYPE category AS ENUM('MEN', 'WOMEN');`
    // )

    // const { rows: results } = await client.query(
    //   `CREATE TABLE riders(
    //     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //     name varchar(80)
    //   );`
    //   )

    res.json({ results })
  } catch (error) {
    res.json({ error })
  }
  await client.release()
}
