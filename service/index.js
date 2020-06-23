const express = require('express')
const router = express()

router.use('/auth', require('./auth/index'))
router.use('/service', require('./api/index'))

module.exports = router
