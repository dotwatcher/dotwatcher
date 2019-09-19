const pool = require('../../database')

const allData = [
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Kristof Allegaert', 1, '', 'SOLO', 7, 13, 45, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Richard Dunnett', 2, '', 'SOLO', 8, 15, 50, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Matt Wilkins', 3, '', 'SOLO', 9, 9, 37, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Ed Pickup', 4, '', 'SOLO', 9, 16, 21, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'James Jordan', 5, '', 'SOLO', 10, 6, 24, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Rimas Grigenas', 6, '', 'SOLO', 11, 7, 21, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Ed Jones', 7, '', 'SOLO', 11, 12, 40, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Nicholas Pusinelli', 8, '', 'SOLO', 11, 22, 31, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Juliana Buhring', 9, '', 'SOLO', 12, 2, 52, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'WOMEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Anthony Hawke', 10, '', 'SOLO', 12, 23, 52, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Mikko Mäkipää', 11, '', 'SOLO', 13, 5, 7, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Chris Holden', 12, '', 'SOLO', 13, 8, 1, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Anton Hunt', 13, '', 'SOLO', 13, 9, 49, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Colin Woof', 14, '', 'SOLO', 13, 19, 23, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Erik Nohlin', 15, '', 'SOLO', 14, 3, 50, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Recep Yesil', 16, '', 'SOLO', 14, 6, 30, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Sebastian Gassner', 17, '', 'SOLO', 14, 7, 10, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Daniel Wilson', 18, '', 'SOLO', 14, 7, 10, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Sergei Konov', 19, '', 'SOLO', 14, 8, 5, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Eelco Weijmans', 20, '', 'SOLO', 14, 14, 6, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN'],
  ['51057c60-ef64-4f7f-942a-0b0f5e5894df', 'Brian Welsh', 21, '', 'SOLO', 17, 8, 40, 'FINISHED', 'TRADITIONAL_GEARED', 'Website', 'MEN']
]

export default async function handle(req, res) {
  const client = await pool.connect()
  let riderID
  try {
    allData.forEach(async row => {
      const { rows: results } = await client.query(`SELECT id, riders.name FROM riders WHERE riders.name = '${row[1]}'`) || []

      if (results.length) {
        riderID = results[0].id
      } else {
        console.log('rider not found')
        const newRider = await client.query(`INSERT INTO riders(name) VALUES($1) RETURNING id`, [row[1]])
        riderID = newRider.rows[0].id
        console.log('New rider created:', newRider.rows[0].name)
      }

      row[1] = riderID
      client.query(`INSERT INTO results(raceid, riderid, position, cap, class, days, hours, minutes, result, bike, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, row)
    })

    await client.release()
    return res.json({ done: 'done' })
  } catch (error) {
    await client.release()
    return res.json({ error })
  } finally {
    client.release
  }
}
// raceid UUID,
// riderID UUID,
// position int,
// cap varchar(80),
// class classification,
// days int,
// hours int,
// minutes int,
// result resultType,
// bike bike,
// dataSource varchar(80),
// category category,
// notes text
