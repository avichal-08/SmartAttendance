import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    gmail:{ type:String,unique:true,required:true,trim:true,minLength:9},
    password:{type:String,required:true,minLength:6},
    classes:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Classes'}]
    },{timestamps: true});

const teacherSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    gmail:{ type:String,unique:true,required:true,trim:true,minLength:9},
    password:{type:String,required:true,minLength:6},
    classes:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Classes'}]
    },{timestamps:true});
    
const classSchema=new mongoose.Schema({
    code:{type:String,trim:true},
    name:{type:String,trim:true},
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    present:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]
},{timestamps:true});

const Student=mongoose.model('Student',studentSchema);
const Teacher=mongoose.model('Teacher',teacherSchema);
const Classes=mongoose.model('Classes',classSchema);

export {Student,Teacher,Classes}