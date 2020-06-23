const express = require('express')
const router = express()

router.use('/links', require('./links'))

module.exports = router