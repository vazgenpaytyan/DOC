const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())
let users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: "Admin" },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: "User" }
]
app.use('/', express.static('C:/Users/Device7/Desktop/DOC/client/build'))
app.listen(8080, () => console.log('Server running'))