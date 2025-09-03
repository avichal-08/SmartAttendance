import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from "jsonwebtoken";
import { Student,Teacher,Classes } from '../schema.js';
import { authMiddleware } from '../middlewares/auth.js';

const router=express.Router();

router.get('/',authMiddleware,async (req,res)=>{
    const teacher=await Teacher.findById(req.userid);
    return res.json(teacher);
});

router.post('/login',async (req,res)=>{
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
        isLogin:true
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
        isLogin:true
    })
    return;
});

router.post('/mark',authMiddleware,async (req,res)=>{
    try{
        const classes=await Classes.create({
            code:req.body.code,
            name:req.body.name,
            teacher:req.userId,
            present:[]
        });
        const classId=classes._id;
        const student=await Teacher.updateOne(
            { _id:req.userId},
            {$addToSet:{classes:classId}});

        return res.status(201).json({
            message:"Class created successfully",
            classId:classId
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"error while updating class"})
    }
});

export default router;