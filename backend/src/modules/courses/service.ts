import { Request, Response } from "express";
import models from "../../models";


export default class CourseService {

    //Get All courses
    allCourses = async () => {
        const courses = await models.Courses.findAll({
            include: [
                {
                    model: models.Students,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        })

        return courses
    }

    // Get One course
    oneCourse = async (req: Request, res: Response) => {
        const course: any = await models.Courses.findByPk(req.params.id, {
            include: [{
                model: models.Students,
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
    createCourse = async (req: Request, res: Response) => {
        if (!req.body.courseData) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            try {
                const course = await models.Courses.create({
                    coursename: req.body.courseData,
                })
                if (req.body.student) {
                    const student = await models.Students.findByPk(req.body.student)
                    await student?.addCourse(course)
                }
                res.status(200).json(course)
            } catch (error: any) {
                res.status(400)
                throw new Error
            }
        }
    }

    // Update a course
    updateCourse = async (req: Request, res: Response) => {
        const course = await models.Courses.findByPk(req.params.id)

        if (!course) {
            res.status(400)
            throw new Error('Course not found')
        }

        await models.Courses.update({ coursename: req.body.coursename ? req.body.coursename : course.coursename }, {
            where: {
                id: req.params.id
            }
        })

        const updtedcourse = await models.Courses.findByPk(req.params.id)

        res.status(200).json(updtedcourse)
    }

    // Delete a course
    deleteCourse = async (req: Request, res: Response) => {
        const course = await models.Courses.findByPk(req.params.id)

        if (!course) {
            res.status(400)
            throw new Error("Class do not exist")
        }

        await models.Courses.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(course)
    }
}