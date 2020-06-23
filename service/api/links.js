const express = require('express')
const router = express()
const pool = require('../../config/database')

router.use(express.json())

router.get('/links',async(req,res)=>{
    const result  = await pool.query('SELECT * FROM "usp_getalllinks"()')
    res.send(result.rows)
})

module.exports = router