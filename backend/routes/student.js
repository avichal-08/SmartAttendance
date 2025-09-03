import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from "jsonwebtoken";
import { Student,Teacher,Classes } from '../schema.js';
import { authMiddleware } from '../middlewares/auth.js';
import { fencingCheck } from '../middlewares/geofencing.js';

const router=express.Router();

router.get('/',authMiddleware,async (req,res)=>{
    const student=await Student.find({_id:req.userId});
    return res.json(student);
});

router.post('/login',async (req,res)=>{

    const student=await Student.findOne({
        gmail:req.body.gmail,
    })

    if(!(student)){
        res.json({
            message:"Student does not exist"
        })
        return;
    }
    if(req.body.password===student.password){

        const token=jwt.sign({
        userId:student._id
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
     const existingStudent=await Student.findOne({
        gmail:req.body.gmail
    });

    if(existingStudent){
        res.json({
            message:"Student already exists"
        })
        return;
    };

    const student=await Student.create({
        name:req.body.name,
        gmail:req.body.gmail,
        password:req.body.password,
        classes:[]
    })
     const token=jwt.sign({
        userId:student._id
    },process.env.JWT_SECRET);

    res.status(200).json({
        token:token,
        isLogin:true
    })
    return;
});

router.post('/mark',authMiddleware,fencingCheck,async (req,res)=>{
    try{
        const { classId} = req.body;

        await Classes.updateOne(
            {_id:classId},
            {$addToSet:{present:req.userId}}
        );

        await Student.updateOne(
            {_id:req.userId},
            {$addToSet:{classes:classId}}
        );

        return res.status(200).json({message:"Attendance marked successfully"});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"error while updating class"})
    }
});

export default router;