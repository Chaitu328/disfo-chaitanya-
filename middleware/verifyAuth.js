const Password = process.env.RoutePassword

const ValidateUserAuth = async(req,res,next)=> {
    const pass= req.headers['x-api-key']
    if(pass !== Password){
        res.status(403).json({ "message": "Unauthorised Access" })
    }else return next()
}

module.exports = ValidateUserAuth