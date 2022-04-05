const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

const verify = require('../security/verifyToken')

const Complaint = require('../models/Complaint')

const {ComplaintValidation} = require('../security/validation')


router.get('/:StudentId',verify, async (req,res)=>{

    try
    {
        const student_complaints = await Complaint.find({student:req.params.StudentId})
        res.json(student_complaints);
    }
    catch(err)
    {
        res.send(err)
    }
})

router.post('/:StudentId',verify, async (req,res)=>{

    const {error} = ComplaintValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newComplaint = new Complaint({
        student:req.params.StudentId,
        block:req.body.block,
        room_no:req.body.room_no,
        complaint:req.body.complaint,
        description:req.body.description
    })
    try{
        const savedComplaint = await newComplaint.save()
        res.json(savedComplaint)
    }
    catch(err)
    {
        res.status(500).json({error:err});
    }
})

router.delete('/:StudentId',verify, async (req,res)=>{
    try{
        const complaint = await Complaint.findOneAndDelete({"_id":req.body.complaint_id,"student":req.params.StudentId})
        res.json(complaint)
    }
    catch(err)
    {
        res.status(500).json({error:err});
    }
})

router.patch('/:StudentId',verify,async(req,res)=>{


    try{
        const updated_complaint = await Complaint.updateOne({"_id":req.body.complaint_id,"student":req.params.StudentId},{$set:
            {
                "description":req.body.description,
                "complaint":req.body.complaint,
                "room_no":req.body.room_no,
                "block":req.body.block
            }
        })
        res.json(updated_complaint)
    }
    catch(err)
    {
        res.status(500).json({error:err});
    }
})

module.exports = router