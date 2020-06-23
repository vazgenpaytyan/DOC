const express = require('express')
const router = express()
const nodemailer = require('nodemailer')
require('dotenv').config()

router.use(express.json())

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.gmailUsername,
        pass: process.env.gmailPassword
    }
})

var rand,mailOptions,host,link

router.get('/',function(req,res){
    res.sendfile('index.html')
})

router.get('/send',function(req,res){

    rand=Math.floor((Math.random() * 100) + 54)
    console.log(req.get('host'))
    host=req.get('host')

    link="http://"+req.get('host')+"/verify?id="+rand
    mailOptions={
        to : process.env.gmailUsername,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    transport.sendMail(mailOptions, function(error, response){
     if(error){
        res.end("error")
     }else{
        res.end("sent")
         }
})
})

router.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'))
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email")
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified")
        }
        else
        {
            console.log("email is not verified")
            res.end("<h1>Bad Request</h1>")
        }
    }
    else{res.end("Request is from unknown source");}
    })


    
    module.exports = router