const express = require('express')
require('dotenv').config()
const port = process.env.listenPort
const app = express()
app.use(express.json())
global.pool = require('./config/database')


app.use('/api', require('./service/index'))

app.listen(port, () => console.log('Server running'))

module.exports = app



