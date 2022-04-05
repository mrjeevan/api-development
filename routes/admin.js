const express = require('express')
const { route } = require('./students')
const router = express.Router()

const verify = require('../security/verifyToken')


const Complaint = require('../models/Complaint')
const Staff = require('../models/Staff')

router.get('/complaints',verify,async (req,res)=>{
    try{
        const all_complaints = await Complaint.find();
        res.json(all_complaints);
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
})

router.post('/complaints',verify,async (req,res)=>{
    
        try{
        const staff = await Staff.findById(req.body.staff);
        console.log(staff);
        if(staff != null)
        {
            try{
            const staff_assigned = await Complaint.findByIdAndUpdate(req.body.complaint,{"staffAssigned":req.body.staff});
                res.json(staff_assigned)
            }catch(err)
            {
                res.status(400).json({error:err});
            }

        }
        else
        {
            res.status(400).json({error:"non existing staff"});
        }
        
    }
    catch(err){
        res.status(400).json({error:err});
        }
    
})

router.get('/staff',verify,async(req,res)=>{ 

    try{
        const all_staff = await Staff.find();
        res.json(all_staff);
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }

})

module.exports = router