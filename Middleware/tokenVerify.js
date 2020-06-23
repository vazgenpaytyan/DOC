const express = require('express')
const router = express()
const cookieParser = require('cookie-parser')
const pool = require('../../config/database')

router.use(cookieParser())
router.use(express.json())

const addresses = require('os').networkInterfaces()
const macAddress = () => addresses['Wi-Fi'][1].mac


//module.exports.check = function (req, res, next) {
router.get('/token', async (req, res) => {
    const mac = macAddress()

    if (req.cookies.token) {
        let currentToken = req.cookies.token
        const result = await pool.query(`SELECT * FROM "usp_getToken"($1,$2)`, [mac, currentToken])

        let token = result.rows[0].righttoken

        if (token != 1) {
            res.cookie('token', token, {
                httpOnly: true
            })

        } else { console.log('token is true') }
        //next()
        res.status(200).json({ token: true })

    } else {
        res.status(403).json({ token: false })
    }

})

module.exports = router
