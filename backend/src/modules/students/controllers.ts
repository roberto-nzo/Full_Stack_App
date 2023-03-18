import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import models from '../../models/index'
import Students from '../../models/students'
import Classes from '../../models/classes'
import Courses from '../../models/courses'
import StudentService from './service';
// const multer = require('multer')
import multer from 'multer'
import path from 'path'
import bcrypt from 'bcryptjs'

const studentService = new StudentService()
// Select all students
const allStudents = expressAsyncHandler(async (req: Request, res: Response) => {
    const studentsData = await studentService.getAllStudents();
    res.status(200).json(studentsData);
})

// Login student
const loginStudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const fetchStudent = await studentService.loginStudent(req, res)
    res.status(200).json(fetchStudent)
})

// Select one student
const oneStudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const oneStudent = await studentService.oneStudent(req, res)
    res.status(200).json(oneStudent)
})

// Upload image
const uploadImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: async (req, file, cb) => {
        const std: any = await Students.findByPk(req.params.id)
        cb(null, std?.dataValues.id + path.extname(file.originalname))
    }
})

const upload = multer({ storage: uploadImage })

// Create a student
const createStudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const createStudent = await studentService.createStudent(req, res)
    res.status(200).json(createStudent)
})

// Student select a course
const selectCourse = expressAsyncHandler(async (req: Request, res: Response) => {
    const addCourse = await studentService.setCourse(req, res)
    res.status(200).json(addCourse)
})

// Student remove a course
const removeCourse = expressAsyncHandler(async (req: Request, res: Response) => {
    const removeCourse = await studentService.removeCourse(req, res)
    res.status(200).json(removeCourse)
})

// Student select a class
const selectClass = expressAsyncHandler(async (req: Request, res: Response) => {
    const setClass = await studentService.setClass(req, res)
    res.status(200).json(setClass)
})

// Update a student
const updtstudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const updateStudent = await studentService.updateStudent(req, res)
    res.status(200).json(updateStudent)
})

// Delete a student
const deleteStudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const deleteStudent = await studentService.deleteStudent(req, res)
    res.status(200).json(deleteStudent)
})


export default { allStudents, oneStudent, createStudent, updtstudent, deleteStudent, selectCourse, removeCourse, selectClass, loginStudent, upload }