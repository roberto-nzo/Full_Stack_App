import { Application, Request, Response, NextFunction } from 'express'
import models from '../../models/index'
import Courses from '../../models/courses'
import Students from '../../models/students'
import Classes from '../../models/classes'


// Select all courses
const allcourses = async (req: Request, res: Response) => {
    const courses: any = await models.Courses.findAll({
        include: [
            {
                model: Students,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ]
    })
    // console.log(courses.map((course: any) => { return course.Students }))
    res.status(200).json(courses)
}

// Select one course
const oneCourse = async (req: Request, res: Response) => {
    const course: any = await models.Courses.findByPk(req.params.id, {
        include: [{
            model: Students,
            attributes: { exclude: ['createdAt', 'updatedAt', 'age', 'ClassId', 'StudentsCourses'] }
        }]
    })

    if (!course) {
        res.status(400).json({
            message: `Course of id ${req.params.id} don't exist!`
        })
    } else {
        res.status(200).json({
            id: course?.id,
            course: course?.coursename,
            students: course.Students.map((std: any) => {
                return ({
                    id: std.id,
                    firstname: std.firstname,
                    lastname: std.lastname
                })
            })
        })
    }
}

// Create a course
const createCourse = async (req: Request, res: Response) => {
    if (!req.body.courseData || !req.body.student) {
        res.status(400)
        throw new Error('Please complete all fields')
    } else {
        try {
            const student = await Students.findByPk(req.body.student)
            const course = await Courses.create({
                coursename: req.body.courseData,
            })
            await student?.addCourse(course)
            res.status(200).json(course)
        } catch (error: any) {
            res.status(400)
            throw new Error
        }
    }
}

// Update a course
const updtCourse = async (req: Request, res: Response) => {
    const course = await Courses.findByPk(req.params.id)

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    const updtedCourse = await Courses.update({ coursename: req.body.coursename ? req.body.coursename : course.coursename }, {
        where: {
            id: req.params.id
        }
    })

    const updtedcourse = await Courses.findByPk(req.params.id)

    res.status(200).json(updtedcourse)
}

// Delete a course
const deleteCourse = async (req: Request, res: Response) => {
    const course = await Courses.findByPk(req.params.id)

    if (!course) {
        res.status(400)
        throw new Error("Class do not exist")
    }

    await Courses.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(course)
}

export default { allcourses, oneCourse, createCourse, updtCourse, deleteCourse }