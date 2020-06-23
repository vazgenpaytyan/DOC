var express = require('express')
var router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const pool = require('../../config/database')
const sendCodeToGmail = require('./sendCodeToGmail')

require('dotenv').config()
let JWT_SECRET = process.env.secret
router.use(express.json())

const addresses = require('os').networkInterfaces()
const ipAddress = () => addresses['Wi-Fi'][1].address
const macAddress = () => addresses['Wi-Fi'][1].mac

router.use(cookieParser())

router.post('/natural', async (req, res) => {
    let { firstName, lastName, email, password } = req.body
    let hash = await bcrypt.hash(password, 10)

    const result = await pool.query(`SELECT * FROM "usp_usersRegistration"($1,$2,$3,$4)`, [firstName, lastName, email, hash])
    if (result.rows[0].inserted == 1) {

        const token = jwt.sign({email}, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })

        const ip = ipAddress()
        const mac = macAddress()

        const result = await pool.query(`SELECT * FROM usp_token($1,$2,$3,$4)`, [id, mac, ip, token])

        res.cookie('token', token, { httpOnly: true })

        sendCodeToGmail(process.env.gmailUsername)
        res.status(200).json({ registered: true })

    } else {
        if (req.cookies.token) {
            res.clearCookie('token')
        }
        res.status(400).json({ message: "User already exists.." })

    }
})


router.post('/juridical', async (req, res) => {
    let { companyName, phone, email, contactPerson, password, taxNumber } = req.body

    const hash = await bcrypt.hash(password, 10)
    const token = jwt.sign(email, JWT_SECRET)

    const result = await pool.query(`SELECT * FROM "usp_organizationRegistration"($1,$2,$3,$4,$5,$6)`, [companyName, phone, email, contactPerson, hash, taxNumber])
    if (result.rows[0].inserted == 1) {

        const token = jwt.sign({email}, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })

        const ip = ipAddress()
        const mac = macAddress()

        const result = await pool.query(`SELECT * FROM usp_token ($1,$2,$3,$4)`, [id, mac, ip, token])

        res.cookie('token', token, { httpOnly: true })

        sendCodeToGmail(process.env.gmailUsername)
        res.status(200).json({ registered: true })

    } else if (result.rows[0].inserted == 0) {
        res.status(400).json({ message: "Tax number already exists.." })
    } else if (result.rows[0].inserted == 2) {
        res.status(400).json({ message: "Email already exists.." })
    }
})

module.exports = router






