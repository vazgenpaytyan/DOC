require('dotenv').config()

var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const pool = require('../config/database')
const bcrypt = require('bcrypt')
const JWT_SECRET = process.env.secret
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser())

app.post("/api/auth/login", async (req, res) => {
    try {
        const sql = 'select * from "users" where "email" = $1'
        const result = await pool.query(sql, [req.body.email])
        if (result.rowCount === 0)
            res.status(404).json({ message: "Incorrect username or password" })
        else {
            const saltedPassword = result.rows[0].password

            const successResult = await bcrypt.compare(req.body.password, saltedPassword)

            if (successResult === true) {
                const payLoad = {
                    "email": result.rows[0].email
                }

                const token = jwt.sign(payLoad, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })
                pool.query('update "users" set "token" = $1 where "email" = $2', [token, result.rows[0].email])
                // res.setHeader("set-cookie", [`token=${token}; httponly; samesite=lax`])
                res.cookie('token', token)
                res.json({ token: true })
            }
            else
                res.status(404).json({ message: "Incorrect username or password" })
        }
    }
    catch (ex) {
        console.error(ex)
    }
})
