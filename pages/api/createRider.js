const pool = require('../../database')

const riders = ['Aaron Beard',
  'Adam Green',
  'Adam Krabbe',
  'Adam Popovec',
  'Adrian OSullivan',
  'Aimerick Stanisiere',
  'Aimone Dal Pozzo',
  'Alain Puiseux',
  'Alain Rumpf',
  'Alan Parkinson',
  'Alastair Maher',
  'Alberto Vaghi',
  'Alberto Varni',
  'Alessandro Perri',
  'Alex Metcalfe',
  'Alexander Greenaway',
  'Alexandre Bourgeonnier',
  'Alexandre Le Roux',
  'Alina Kilian',
  'Alistair McGregor',
  'Alistair Ross',
  'Amy Lippe',
  'Anders Syvertsen',
  'Andis Aboltins',
  'Andrea Collino',
  'Andrea De Gruttola',
  'Andrea Galanti',
  'Andrea Polo',
  'Andrea-Luca Zarotti',
  'Andreas Bader',
  'Andreas Behrens',
  'Andreas Hauser',
  'Andreas Polo',
  'Andreas Thier',
  'Andreas Wittkemper',
  'Andrej Zaman',
  'Andrew Allday',
  'Andrew Booth',
  'Andrew Boyd',
  'Andrew Brogan',
  'Andrew Sallnow',
  'Andrs Navarro Rodrigo',
  'Andy Buchs',
  'Andy Chadwick',
  'Anisa Aubin',
  'Anna Petters',
  'Anthony Hawke',
  'Anton Hunt',
  'Anton Lindberg',
  'Antonio Baos',
  'Arjan Zwanenburg',
  'Arnoldas Jakstas',
  'Arron Hodder',
  'Ashley Sharp',
  'Avni Berk Okyay',
  'Aydin Bez',
  'Barry Duncan',
  'Bart Verheijen',
  'Bastiaan Vlaskamp',
  'Beate Weiland',
  'Bela Kuzler',
  'Ben Clay',
  'Ben Davies',
  'Ben May',
  'Ben Snodin',
  'Ben Steurbaut',
  'Ben Thompson',
  'Benjamin Kraehenmann',
  'Bernd Frick',
  'Bernd Paul',
  'Bernhard Rabold',
  'Bertrand Nerincx',
  'Bjorn Lenhard',
  'Björn Lenhard',
  'Boarnici Florian Marius',
  'Boris Pupic',
  'Brian Welsh',
  'Bruno Ferraro',
  'Bryce Bnat',
  'Burkay Gnay',
  'Calvin O’Keeffe',
  'Carlos Mazón',
  'Caroline Item',
  'Cesare Pedrini',
  'Charles Batho',
  'Charles Billau',
  'Charles Christiansen',
  'Charlotte Dequevauviller',
  'Cheng-Hui Hsieh',
  'Chris Bennett',
  'Chris Holden',
  'Chris Phillips',
  'Chris Thomas',
  'Chris White',
  'Christian Dittmann',
  'Christian Fichter',
  'Christian Schaefer',
  'Christoph Fuhrbach',
  'Christopher Bennett',
  'Christopher Dennis',
  'Christopher Duffy',
  'Christopher Hung Han Yun',
  'Christopher Murkin',
  'Christopher Teasdale',
  'Clement Mahe',
  'Clement Stawicki',
  'Clement Venus',
  'Colin James',
  'Colin Woof',
  'Constantin Schtt',
  'Craig Bachelor',
  'Craig Dolwin',
  'Craig Edwards',
  'Cristian Amoroso',
  'Dan Massie',
  'Daniel Brayson',
  'Daniel Fisher',
  'Daniel Gregory',
  'Daniel Johansson',
  'Daniel Nash',
  'Daniel Nicolas',
  'Daniel Nicols Muoz',
  'Daniel Szajna',
  'Daniel Welch',
  'Daniel Wilson',
  'Danny Green',
  'Dario Demarco',
  'Darren Franks',
  'David Coulon',
  'David Fairweather',
  'David Goldberg',
  'David Hawkins',
  'David King',
  'David Price',
  'David Sherrington',
  'David Winton',
  'Davidson Kingan',
  'Denis Recazens',
  'Denis Uzdiaev',
  'Dennis Froese',
  'Derek Boocock',
  'Derek Brown',
  'Dermot O’Grady',
  'Didier Matteoda',
  'Dimitris Mavropoulos',
  'Dimitry Kumundzhiev',
  'Dmitry Motylev',
  'Dominik Mikiewicz',
  'Douglas Migden',
  'Douglas Thomson',
  'Dragan Mladenovic',
  'Dylan Hubble',
  'Ed Jones',
  'Ed Pickup',
  'Ed Wolstenholme',
  'Ede Harrison',
  'Edgar Haldimann',
  'Edu Gonzalo',
  'Eelco Weijmans',
  'Eivind Tandrevold',
  'Ellie Solomides',
  'Emiliano Baravalle',
  'Emily Chappell',
  'Enric Burgstaller',
  'Eric Cupo',
  'Eric Jacquemin',
  'Eric Kampherbeek',
  'Eric Spencer',
  'Erik Nohlin',
  'Erik Ringqvist',
  'Erika Rowen',
  'Ethan Stewart',
  'Eyvind Bergstrm',
  'Fabian Rabe',
  'Francis Ransley',
  'Francisco Afonso',
  'Frank Proud',
  'Frank Thies',
  'Frank van der Sman',
  'Franois Laperche',
  'Fraser Hughes',
  'Frederic Laforge',
  'Fridtjof Harwardt',
  'Gaby Leveridge',
  'Gareth Baines',
  'Gary Clark',
  'Gary Cunnington',
  'Gavin Scott',
  'Geoffroy Dussault',
  'George Bennett',
  'George Michakis',
  'George Tsekouras',
  'Gerhard Kossytorz',
  'Ghirtoi Daniel',
  'Giambattista Cassinelli',
  'Giampiero Monti',
  'Giancarlo Avella',
  'Gianluca Morini',
  'Gianmarco Vignati',
  'Giannis Massas',
  'Giorgio Zampedri',
  'Greg Hilson',
  'Gregory Barry',
  'Guendalina Dal Pozzo',
  'Guillermo Nicols Muoz',
  'Gunther Desmedt',
  'Hans-Jurgen Schmitz-Rech',
  'Harald Triebnig',
  'Heath Ryan',
  'Hegedus Adrian',
  'Henri van Winkoop',
  'Henry Krtke',
  'Hermann Dopfer',
  'Hilde Geens',
  'Hkan Hglin',
  'Ian Oliver',
  'Ian To',
  'Ian Tosh',
  'Ian Walker',
  'Ingeborg Dybdal Oie',
  'Innes Ogilvie',
  'Ishmael Burdeau',
  'Isobel Jobling',
  'Ive Weygers',
  'Jack Keevill',
  'Jack Thompson',
  'Jacopo Porreca',
  'Jakob Dieckmann',
  'Jakub Dvorak',
  'Jakub Dvořák',
  'Jakub Vlcek',
  'James Craven',
  'James Hayden',
  'James Illman',
  'James Jinks',
  'James Jordan',
  'James Kirk',
  'James Mansell',
  'James Stannard',
  'Jamie Saunders',
  'Jan Trouv',
  'Jan-Willem Bobbink',
  'Jane Chadwick',
  'Jani Simula',
  'Janis Viskers',
  'Janne Villikka',
  'Janus Jensen',
  'Jason Alcock',
  'Jason Smith',
  'Javier Ruiz',
  'Jayne Wadsworth',
  'Jean-michel Rivoire',
  'Jean-Yves Coffre',
  'Jean-Yves Couet',
  'Jeff Liu',
  'Jim Anquez',
  'Jim Stewart',
  'Jiri Semerad',
  'Joan Carrillo',
  'Jochen Leissner',
  'Joe Selby',
  'Johanna Jahnke',
  'Johanna Josten-van Duinkerken',
  'John Cooke',
  'John Duggan',
  'John Lee',
  'John Sherlock',
  'John Weller',
  'Jonah Jones',
  'Jonas Goy',
  'Jonathan Elliot',
  'Jonathan Focke',
  'Jonathan Kelley',
  'Jonathan Rankin',
  'Jonny Gallimore',
  'Josef Frick',
  'Joseph Dorsett',
  'Joseph Todd',
  'Josh Cunningham',
  'Josh Ibbett',
  'Joshua Rea',
  'Jules Stennes',
  'Juliana Buhring',
  'Jürgen Knupe',
  'Jurriaan Oudhoff',
  'Karen Tostee',
  'Karim Wiesmann',
  'Karl Fournier',
  'Karl Speed',
  'Karolina Maciejewska',
  'Katriina Heiskanen',
  'Keith Hicks',
  'Kieran Shanahan',
  'Kim Raeymaekers',
  'Krisjanis Jansons-Ratiniks',
  'Kristof Allegaert',
  'Kurt Verheyden',
  'Lamri Adjis',
  'Lars Gtzenberger',
  'Lea Meszarosova',
  'Lee Grieve',
  'Lee Pearce',
  'Leo Hrdek',
  'Leo Tong',
  'Leonidas Mathioudis',
  'Levente Bagoly',
  'Lieuwe Medema',
  'Lionel Bobb',
  'Loc Nys Taymans',
  'Lorenzo Gamberini',
  'Luca Colonetti',
  'Luca Somm',
  'Luciano Margoni',
  'Luigi Burini',
  'Lukasz Olejniczak',
  'Luke Allen',
  'Malte Hager',
  'Mao Pong ‘Steven’ Hon',
  'Marcel Amore',
  'Marin de Saint-Exupery',
  'Marin de Saint-Exupry',
  'Marin Roso',
  'Mario Zangrando',
  'Marion Dziwnik',
  'Marius Ratkevicius',
  'Mark Booker',
  'Mark Charles',
  'Mark Collinson',
  'Mark Hugaerts',
  'Mark Hunter',
  'Mark Lison',
  'Mark Townsend',
  'Markku Leppala',
  'Martian Cioana',
  'Martin Frerichs',
  'Martin Mcconnell',
  'Martin Neitzke',
  'Martin Temmen',
  'Martin Tonkov',
  'Massimiliano Fancoli',
  'Massimillano Fancoli',
  'Mathias Dalgas',
  'Matt Brady',
  'Matt Edwards',
  'Matt Mills',
  'Matt Wilkins',
  'Matthew Falconer',
  'Matthew Pollard',
  'Matthew Swain',
  'Matthias Mueller',
  'Matthieu Lifschitz',
  'Matthijs Ligt',
  'Mattia Biffi',
  'Maurice Smith',
  'Max Kraus',
  'Max Lindberg',
  'Maxime Barat',
  'Meg Pugh',
  'Mehdi Otmann',
  'Mehmet Serta nal',
  'Melissa Pritchard',
  'Michael Cannon',
  'Michael Kronberger',
  'Michael Lapcevic',
  'Michael Wacker',
  'Michael Woolridge',
  'Michal Hampl',
  'Michal Plech',
  'Michal Serafin',
  'Michal Switalski',
  'Michal Wolff',
  'Michel Sutter',
  'Michel Vandermeerschen',
  'Miguel Vilacha',
  'Mike Sheldrake',
  'Mikko Mäkipää',
  'Miles Goodman',
  'Milko Gennai',
  'Mindaugas Sasnauskas',
  'Mohamed El alami',
  'Mostyn Brown',
  'Muammer Yildiz',
  'Nathan Jones',
  'Neil Lauder',
  'Neil Matthews',
  'Neil Phillips',
  'Nelson Trees',
  'Niall Cooling',
  'Niccolo Varanini',
  'Nicholas Busst',
  'Nicholas Finch',
  'Nicholas Pusinelli',
  'Nick Dodd',
  'Nick Spencer-Vellacott',
  'Nico Coetzee',
  'Nico Deportago-Cabrera',
  'Nicole Kraus',
  'Noel McNamara',
  'Norbert Muench',
  'Oliver Bieri',
  'Oliver Monaghan-Coombs',
  'Oliver Quinton',
  'Oliver Wolf',
  'Olivier Kan',
  'Osvaldo Navia',
  'Patch Doyle',
  'Patricio Ortiz de Rozas',
  'Patrick Day',
  'Patrick Miette',
  'Paul Alderson',
  'Paul Buckley',
  'Paul Ferguson',
  'Paul Hoffmann',
  'Paul Pritchard',
  'Paul Toigo',
  'Paul Ward',
  'Paula Regener',
  'Pawel Sekulski',
  'Pete Robson',
  'Peter Boynton',
  'Peter Hobbs',
  'Peter Sandholt',
  'Peter Tannenberger',
  'Peter Vancampenhout',
  'Peter Weller',
  'Petra Scherer',
  'Philipp Schwedthelm',
  'Philippe Lebas',
  'Pierluigi Talamona',
  'Piero Rivoivra',
  'Pippa Handley',
  'Rachel Batt',
  'Rafael Martinez Gonzalez',
  'Ralf Hemmann',
  'Raphael Michelangelo Grau',
  'Ravishankar Balaji',
  'Raymond Dulieu',
  'Rebecca Harrison',
  'Recep Yesil',
  'Remy Pedussel',
  'Ren Bonn',
  'Ren Hinnum',
  'Richard Abraham',
  'Richard Dunnett',
  'Richard Gate',
  'Rickie Cotter',
  'Rik Deckx',
  'Rimas Grigenas',
  'Rob McRitchie',
  'Rob Savin',
  'Robert Carlier',
  'Robert Goldie',
  'Robert Jordan',
  'Robert Mcritchie',
  'Robert Quirk',
  'Robert Thomson',
  'Roberto Baldassi',
  'Robin Borstmayer',
  'Rodrigue Lombard',
  'Roger Seaton',
  'Roland Guillon',
  'Rory Kemper',
  'Rory McCarron',
  'Rose McGovern',
  'Rudy Rollenberg',
  'Rudy Testa',
  'Rui Rodrigues',
  'Ry McGrath',
  'Ryan Le Garrec',
  'Ryszard Deneka',
  'Sam Thomas',
  'Samual Becuwe',
  'Samuel Becuwe',
  'Samuel Weidtmann',
  'Samuli Mäkinen',
  'Sanne Kleijne',
  'Saulius Vizbaras',
  'Scott Andrews',
  'Scott Wilkins',
  'Sebastiaan Sijtstra',
  'Sebastian Gassner',
  'Sebastien Nolens',
  'Sergei Konov',
  'Sergey Shulubin',
  'Sergio Lopez',
  'Sergiu Buciuc',
  'Sheila Woollam',
  'Silvano Colombo',
  'Silviu Martin',
  'Simeon Jurukov',
  'Simon Bottomley',
  'Simon Hayward',
  'Simon Romaine',
  'Simon Sramek',
  'Sina Witte',
  'Sjoerd Witjes',
  'Socrates Solomides',
  'Sonke Meyer',
  'Stanislaw Piorkowski',
  'Stefan Landtau',
  'Stefan Maertens',
  'Stefan Slegl',
  'Steffan Streich',
  'Stephane Molliet',
  'Stephane Ouaja',
  'Stephen Bailey',
  'Stephen Haines',
  'Stewart McConnell',
  'Stuart Birnie',
  'Stuart White',
  'Stylianos Kerkentzes',
  'Svenja Schrade',
  'Thierry Mourlanne',
  'Thomas Chateau',
  'Thomas Chavrier',
  'Thomas Dupin',
  'Thomas Egger',
  'Thomas Hoffmann',
  'Thomas Jacquelinet',
  'Thomas Scherer',
  'Thomas Weber',
  'Tim Arnold',
  'Tim Naert',
  'Timothy France',
  'Timothy Lang',
  'Timothy Maundrell',
  'Tom Hudders',
  'Tom Probert',
  'Tom Searby',
  'Tom Stone',
  'Tom Willard',
  'Tomas Labanc',
  'Tomas Navratil',
  'Torsten Frank',
  'Turgut Alper Kerpii',
  'Turloch O Siochain',
  'Ultan Coyle',
  'Urs Arnold Kutschera',
  'Valter Mariani',
  'Vasiliki Voutzali',
  'Victor Decouard',
  'Vincent Muhlethaler',
  'Vincenzo Sannicandro',
  'Vinicius Martins',
  'Walter Reiterer',
  'Will Armitage',
  'Willem Van Zyl',
  'William Dunk',
  'Wim Ceulemans',
  'Winston Christie-Blick',
  'Yannick Banville',
  'Yiqun Fu',
  'Yoann Saludes',
  'Zbynek Simcik']

export default async function handle(req, res) {
  const client = await pool.connect()
  try {
    // const result = await client.query(
    //   `INSERT INTO riders(name) VALUES($1)`,
    //   ['James Hayden']
    // )

    riders.forEach(rider => {
      client.query(`INSERT INTO riders(name) VALUES($1)`, [rider])
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