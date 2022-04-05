const express = require('express')
const {loginValidation} = require('./validation')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Student = require('../models/Student')
const Staff = require('../models/Staff')
const Admin = require('../models/Admin')

router.post('/student',async (req,res)=>{

    // validate
    const {error} = await loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check for user
    const user = await Student.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Email or password is wrong :(  psst : Email not found');

    //validating
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong :(  psst : password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

})

router.post('/staff',async (req,res)=>{

    // validate
    const {error} =  loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check for user
    const user = await Staff.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Email or password is wrong :(  psst : Email not found');

    //validating
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong :(  psst : password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

})

router.post('/admin',async (req,res)=>{

    // validate
    const {error} =  loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check for user
    const user = await Admin.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Email or password is wrong :(  psst : Email not found');

    //validating
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong :(  psst : password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

})

module.exports = router;