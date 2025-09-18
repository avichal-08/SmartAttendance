import express from 'express';
import { Classes,Teacher} from '../schema.js';
import { authMiddleware } from '../middlewares/auth.js';

const router=express.Router();

router.get('/',authMiddleware, async (req,res)=>{
    try{

        const active = await Classes.findOne({ isActive: true });
        if (active) {
            const teacher = await Teacher.findById(active.teacher);
            const ActiveClass = {
                classId: active._id,
                subject: active.subject,
                teacher: teacher.name,
                createdAt: active.createdAt
            };
    return res.status(200).json({ hasActive: true, ActiveClass });
} else {
    return res.status(200).json({ hasActive: false });
}
}catch(err){
    console.log(`Error from active class ${err}`)
    return res.status(401).json({message:"internal server error"})
}});

export default router; 