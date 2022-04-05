const jwt = require('jsonwebtoken')

function studentAuth(req,res,nxt)
{
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Unauthorized");

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        nxt();
    }
    catch(err)
    {
        res.status(401).send('Invalid Token');
    }
}

module.exports =  studentAuth;