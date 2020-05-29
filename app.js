const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())


app.listen(8080, () => console.log('Server running'))