const mssql = require("mssql")
require('dotenv').config()

const pool = new mssql.ConnectionPool({
    host: process.env.HOST,
    server: process.env.SERVER,
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 1433,
    options: {
        enableArithAbort: false
    }
})

module.exports = pool


