const express = require('express')
const router = express()
const cookieParser = require('cookie-parser')
const pool = require('../../config/database')

router.use(express.json())

const addresses = require('os').networkInterfaces()
const macAddress = () => addresses['Wi-Fi'][1].mac

router.post("/logout", async (req, res) => {

    try {
        const mac = macAddress()
        let comparedtoken = req.cookies.token
        if (comparedtoken) {
            res.clearCookie('token')
            const result = await pool.query(`SELECT * FROM "usp_logout"($1)`, [mac])
            res.status(200).json({ message: "logged out successfully" })
        } else {
            res.status(200).json({ message: "no token" })
        }

    } catch (err) {
        res.status(200).json({ message: "no token" })
    }

})

module.exports = router