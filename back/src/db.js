//*Database connection
const { Pool } = require('pg');

//*Conf
const { db } = require('./config');

const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;