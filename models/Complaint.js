const mongoose = require('mongoose')
var Schema = mongoose.Schema
const complaint = mongoose.Schema({
    student:{type: Schema.Types.ObjectId, ref: 'Student'},
    block:{
        type:String,
        required:true
    },
    room_no:{
        type:String,
        required:true
    },
    complaint:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    solved:{
        type:Boolean,
        default:0
    },
    staffAssigned:{
        type: String,
        default:''
    },
})

module.exports = mongoose.model('Complaint', complaint)