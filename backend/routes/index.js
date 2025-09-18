import express from 'express';
import student from './student.js';
import teacher from './teacher.js';
import active  from './activeClass.js'
const router=express.Router();

router.use('/student',student);
router.use('/teacher',teacher);
router.use('/active',active);

export default router;
