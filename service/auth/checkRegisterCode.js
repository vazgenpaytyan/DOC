const express = require('express')
const router = express()


router.post('/checkRegisterCode', async (req, res) => {

    try{
        
        let checkedCode = req.body.code
        let rightCode = 123456//pool.query(`SELECT * FROM getRightGmailCode($1)`,[checkedCode])
        (checkedCode === rightCode) ? res.status(200).json({ message: 'Right code' })
        : res.status(406).json({ message: 'Wrong code' })

    }catch(err){
        console.log(err)
    }

})