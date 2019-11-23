import pool from '../../database'

export default async function handle(req, res) {
  const client = await pool.connect()

  try {
    const { rows: races } = await client.query(`SELECT name, array_agg(year) as years, array_agg(length) as lengths, array_agg(id) as ids, array_agg(slug) as slugs FROM races GROUP BY name  ORDER BY name;`)

    const formattedRaces = races.map(race => {
      return {
        name: race.name,
        events: race.years.map((year, index) => {
          return {
            id: race.ids[index],
            length: race.lengths[index],
            slug: race.slugs[index],
            year
          }
        }).sort((a, b) => b.year - a.year)
      }
    })

    res.json(formattedRaces)
  } catch (error) {
    res.json({ error })
  } finally {
    client.release()
  }
}
