const pool = require('../../database')

const riders = ['Jon Heslop']

export default async function handle(req, res) {
  const client = await pool.connect()
  try {
    // const result = await client.query(
    //   `INSERT INTO riders(name) VALUES($1)`,
    //   ['James Hayden']
    // )

    riders.forEach(async rider => {
      const result = await client.query(`INSERT INTO riders(name) VALUES($1) RETURNING id`, [rider])
      return res.json(result.rows[0])
    })
  } catch (error) {
    return res.json({ error })
  } finally {
    client.release()
  }
}



// CREATE TABLE races(
//   name varchar(80),
//   slug varchar(80),
//   year int,
//   description text,
//   startDate date,
//   endDate date,
//   startLocation varchar(80),
//   finishLocation varchar(80),
//   length varchar(80),
//   terrain: varchar(80)
// );
