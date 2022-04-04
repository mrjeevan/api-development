const express = require('express')
const route = express.Router()

const Complaint = require('../models/Complaint')

route.get('/:staffId',async(req,res)=>{
    try{
        const all_assigned_complaints = await Complaint.find({staffAssigned:req.params.staffId});
        res.json(all_assigned_complaints);
    }catch(err)
    {
        res.status(400).json({error:err});
    }
})

route.post('/:staffId',async(req,res)=>{
    try{
        const complaint = await Complaint.findOneAndUpdate({"staffAssigned":req.params.staffId,"_id":req.body.complaint},{"solved":true});
        res.json(complaint);
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
})


module.exports = route