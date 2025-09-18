import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from "jsonwebtoken";
import { Student,Teacher,Classes } from '../schema.js';
import { authMiddleware } from '../middlewares/auth.js';

const router=express.Router();

router.get('/',authMiddleware,async (req,res)=>{
    const teacher=await Teacher.findById(req.userId);
    return res.json(teacher);
});

router.post('/login',async (req,res)=>{

    if(!(req.body.gmail&&req.body.password)){
        return res.status(401).json({message:"Wrong Credentials"})
    }

    const teacher=await Teacher.findOne({
        gmail:req.body.gmail,
    })

    if(!(teacher)){
        res.json({
            message:"Teacher does not exist"
        })
        return;
    }
    if(req.body.password===teacher.password){

        const token=jwt.sign({
        userId:teacher._id
    },process.env.JWT_SECRET);

    res.status(200).json({
        token:token,
        isLogin:true,
        role:"teacher"
    })
    return;
    }else{
        res.json({
            message:"wrong password"
        })
        return
    }
});

router.post('/signup',async (req,res)=>{

    if(!(req.body.gmail&&req.body.password&&req.body.name)){
        return res.status(401).json({message:"Wrong Credentials"})
    }

     const existingTeacher=await Teacher.findOne({
        gmail:req.body.gmail
    });

    if(existingTeacher){
        res.json({
            message:"Teacher already exists"
        })
        return;
    };

    const teacher=await Teacher.create({
        name:req.body.name,
        gmail:req.body.gmail,
        password:req.body.password,
        classes:[]
    })
     const token=jwt.sign({
        userId:teacher._id
    },process.env.JWT_SECRET);

    res.status(200).json({
        token:token,
        isLogin:true,
        role:"teacher"
    })
    return;
});

router.post('/create',authMiddleware,async (req,res)=>{
    console.log("inside create")
    const latitude=parseFloat(req.body.latitude);
    const longitude=parseFloat(req.body.longitude);
    try{
        const classes=await Classes.create({
            subject:req.body.subject,
            teacher:req.userId,
            present:[],
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
                }
        });
        const classId=classes._id;
        await Teacher.updateOne(
            { _id:req.userId},
            {$addToSet:{classes:classId}});

        return res.status(201).json({
            created:true,
            message:"Class created successfully",
            classId:classId
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            created:false,
            message:"error while creating class"
        })
    }
});

router.post('/end',authMiddleware,async (req,res)=>{
    try{
        const {classId}=req.body;
        if(!classId){
            return res.status(401).json({message:"Class ID not found"})
        }

        const session=await Classes.findByIdAndUpdate(
            classId,
            {isActive:false},
            {new:true}
        )

        const StudentID=session.present||[];

        const students = await Promise.all(
            StudentID.map((id) => Student.findById(id))
        );

        return res.status(200).json({
            ended:true,
            students
        });

    }catch(err){
        console.log(`Error from /teacher/end ${err}`)
        return res.status(401).json({
            ended:false,
            message:"Problem in ending session"
        })
    }
})

export default router;