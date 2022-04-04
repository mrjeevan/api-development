const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    name:{
        type : String,
        required:true,
        max:100
    },
    email:{
        unique: true,
        type:String,
        required:true,
        max:200
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    staffId:{
        unique: true,
        type:String,
        required:true,
        max: [10, 'Enter valid staffId'],
        min: [10, 'Enter valid staffId']
    },
});

module.exports = mongoose.model('Staff',staffSchema);