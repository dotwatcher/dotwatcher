const pool = require('../../database')

export default async function handle(req, res) {
  const client = await pool.connect()

	const { slug, year } = req.query

  try {
    // const { rows: results } = await client.query(`select column_name,data_type from information_schema.columns where table_name = 'results';`)
    // const { rows: results } = await client.query(`TRUNCATE results;`)
    // const { rows: results } = await client.query(`SELECT * FROM results`)

    const { rows: results } = await client.query(`SELECT riders.name, races.name AS racename, races.year, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND races.slug = '${slug}' AND races.year = ${year}`)

    // const { rows: results } = await client.query(
    //   `select enum_range(enum_first(null::resultType),null::resultType);`
    // )

    // const { rows: results } = await client.query(
    //   `CREATE TYPE resultType AS ENUM ('FINISHED', 'FINISHED_OVER_TIME_LIMIT', 'SCRATCHED', 'DISQUALIFIED')`
    // )

    // const { rows: results } = await client.query(
    //   `CREATE TYPE classification AS ENUM ('SOLO', 'PAIR');
    //    CREATE TYPE resultType AS ENUM ('FINISHED', 'SCRATCHED', 'DISQUALIFIED');
    //    CREATE TYPE bike AS ENUM ('TRADITIONAL_GEARED', 'FIXED', 'SINGLE_SPEED', 'TANDEM', 'UNICYCLE', 'VELOMOBILE');
    //    CREATE TYPE category AS ENUM('MEN', 'WOMEN');`
    // )

    // const { rows: results } = await client.query(
    //   `CREATE TABLE results(
    //     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //     raceID UUID,
    //     riderID UUID,
    //     position int,
    //     cap varchar(80),
    //     class classification,
    //     days int,
    //     hours int,
    //     minutes int,
    //     result resultType,
    //     bike bike,
    //     dataSource varchar(80),
    //     category category,
    //     notes text
    //   );`
    //   )

    res.json({ results })
  } catch (error) {
    res.json({ error })
  }
  await client.release()
}
