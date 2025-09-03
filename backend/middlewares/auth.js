import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        res.status(401).json({
            message:"no/wrong auth header"
        })
        return ;
    }

    const token=authHeader.split(' ')[1]
     try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
        req.userId=decoded.userId;
        next();
        }}catch(err){
            console.error("JWT verification failed:",err.message);
            res.status(401).json({
            allowed:false,
            message:"Invalid or expired token"
        });
        return;
        }
};

export {authMiddleware};