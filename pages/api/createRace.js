const pool = require('../../database')

export default async function handle(req, res) {
  const client = await pool.connect()
  try {

    const races = [
      ['Transcontinental Race', 'transcontinental-race-2019', 2019, '2019-07-21T04:00:00Z', '2019-08-11T04:00:00Z', 'Burgas, Bulgaria', 'Brest, France', 4000, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2018', 2018, '2018-07-29T22:00:00Z', '2018-08-11T04:00:00Z', 'Geraardsbergen, Belgium', 'Meteora, Greece', 3900, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2017', 2017, '2017-07-28T22:00:00Z', '2017-08-11T04:00:00Z', 'Geraardsbergen, Belgium', 'Meteora, Greece', 4000, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2016', 2016, '2016-07-29T22:00:00Z', '2016-08-11T04:00:00Z', 'Geraardsbergen, Belgium', 'Çanakkale, Turkey', 3800, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2015', 2015, '2015-07-25T00:00:00Z', '2015-08-11T04:00:00Z', 'Geraardsbergen, Belgium', 'Istanbul, Turkey', 4200, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2014', 2014, '2014-08-09T08:00:00Z', '2014-08-21T04:00:00Z', 'London, UK', 'Istanbul, Turkey', 3600, 'road'],
      ['Transcontinental Race', 'transcontinental-race-2013', 2013, '2013-08-03T08:00:00Z', '2013-08-15T04:00:00Z', 'London, UK', 'Istanbul, Turkey', 3200, 'road']
    ]

    races.forEach(race => {
      client.query(`INSERT INTO races(name, slug, year, startDate, endDate, startLocation, finishLocation, length, terrain) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, race)
    })

    await client.release()
    return res.json({ done: 'done' })
  } catch (error) {
    await client.release()
    return res.json({ error })
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
