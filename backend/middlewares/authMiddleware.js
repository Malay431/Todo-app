const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({message:'Unauthorized'})
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(400).json({message:'Unauthorized'})
        }
        req.user = decode
        next()
    }catch(err){
        return res.status(400).json({message:'Auth Error Occured', err})
    }
}

module.exports= authMiddleware