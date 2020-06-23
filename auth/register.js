var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const pool = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.secret

require('dotenv').config()

app.use(bodyParser())
app.use(cookieParser())

app.post("/api/auth/register", async (req, res) => {
    let { email, password } = req.body
    const result = await pool.query('select "email" from users where "email" = $1', [email])
    if (result.rowCount === 0) {
        const hash = await bcrypt.hash(password, 10)
        await pool.query('insert into "users" ("email","password") values ($1,$2)',
            [email, hash])

        const payLoad = {
            "email": req.body.email
        }

        const token = jwt.sign(payLoad, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })
        pool.query('update "users" set "token" = $1 where "email" = $2', [token, req.body.email])
        res.cookie('token', token)


        res.status(200).json({ registered: true })
    }

    else
        res.status(400).json({ message: "User already exists.." })
})



app.listen(8080, () => console.log("Session Auth - Listening on " + 8080))


