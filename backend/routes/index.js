import express from 'express';
import student from './student.js';
import teacher from './teacher.js';
const router=express.Router();

router.use('/student',student);
router.use('/teacher',teacher);

export default router;
