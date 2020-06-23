const express = require('express')
const router = express()

//router.use('/login', require('./login'))
router.use('/register', require('./register'))
router.use('/logout', require('./logout'))
router.use('/sendCodeToGmail', require('./sendCodeToGmail'))

module.exports = router