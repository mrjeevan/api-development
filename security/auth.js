const express = require('express');
const { modelName } = require('../models/Complaint');
const router = express.Router();

const Student = require('../models/Student')
const Staff = require('../models/Staff')
const Admin = require('../models/Admin')

//validation imports
const {StudentRegistrationValidation, StaffRegistrationValidation} = require('./validation')

router.post('/student', async (req,res)=>{

    const {error} = StudentRegistrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_student = new Student({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        usn:req.body.usn
    })
    try{
        const saved_student = await new_student.save();
        res.json({id:saved_student._id})
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
})

router.post('/staff', async (req,res)=>{

    const {error} = StaffRegistrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_staff = new Staff(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            staffId:req.body.staffId
        })
        try{
            const save_staff = await new_staff.save();
            res.json({id:save_staff._id})
        }
        catch(err)
        {
            res.status(400).json({error:err});
        }
    
})

router.post('/admin', async (req,res)=>{

    const {error} = StaffRegistrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_admin = new Admin(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            staffId:req.body.staffId
        })
        try{
            const save_admin = await new_admin.save();
            res.json({id:save_admin._id})
        }
        catch(err)
        {
            res.status(400).json({error:err});
        }
})

module.exports = router;