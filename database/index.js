import { Pool } from "pg";

const config = {
	database: process.env.PGDATABASE,
	host: process.env.PGHOST,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	ssl: {
		rejectUnauthorized: false
	},
	user: process.env.PGUSER
};

const client = new Pool(config);
module.exports = client;
