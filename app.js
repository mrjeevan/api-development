const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
//connecting to db
require('dotenv/config');
mongoose.connect(process.env.DB_CONNECTION,()=>{console.log('connected');});

//bodyparser
app.use(bodyparser.json())

//Register(Student,Staff,Admin)
const register = require('./security/auth')
app.use('/api/register',register)

//Student
const studentHome = require('./routes/students')
app.use('/api/sutdent',studentHome)

//Admin
const adminHome = require('./routes/admin');
app.use('/api/admin',adminHome)

//Staff
const staffHome = require('./routes/staff');
app.use('/api/staff',staffHome)

app.listen(3000)