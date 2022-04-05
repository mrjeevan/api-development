const joy = require('@hapi/joi')


const StudentRegistrationValidation = (data) =>{
    const StudentRegistrationSchema = joy.object({
        name: joy.string().required().max(100),
        email: joy.string().required().email(),
        password: joy.string().min(6).required(),
        usn:joy.string().required().min(10).max(10)
    });
    return StudentRegistrationSchema.validate(data)
}

const StaffRegistrationValidation = (data) =>{
    const StaffRegistrationSchema = joy.object({
        name: joy.string().required().max(100),
        email: joy.string().required().email(),
        password: joy.string().min(6).required(),
        staffId:joy.string().required().min(10).max(10)
    })
    return StaffRegistrationSchema.validate(data)
}

const ComplaintValidation = (data) =>{
    const ComplaintSchema = joy.object({
        block: joy.string().required().max(30),
        room_no: joy.number().required(),
        complaint: joy.string().required().max(30),
        description: joy.string().required().max(100),
        
    })
    return ComplaintSchema.validate(data)
}

const loginValidation = (data) =>{
    const loginSchema = joy.object({
        email: joy.string().required().email(),
        password: joy.string().min(6).required(),
    })

    return loginSchema.validate(data);

}

module.exports.StudentRegistrationValidation = StudentRegistrationValidation
module.exports.StaffRegistrationValidation = StaffRegistrationValidation
module.exports.ComplaintValidation = ComplaintValidation
module.exports.loginValidation = loginValidation