import { Request, Response } from 'express'
import Students from '../../models/students'
import Classes from '../../models/classes'
import Courses from '../../models/courses'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class StudentService {
    getAllStudents = async () => {
        const fetchStudents = await Students.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            include: [
                {
                    model: Courses,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Classes,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            order: [
                ['id', 'ASC']
            ]
        })
        // console.log(fetchStudents)

        let studentsData: {}[] = []
        fetchStudents.forEach(item => {
            const data: any = item.dataValues
            const courseitem = data.Courses
            let studentsCourses: any = []
            courseitem.forEach((std: any) => {
                studentsCourses.push(std.coursename)
            })
            // console.log(studentsCourses)
            studentsData.push({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                age: data.age,
                course: data["Courses"].length !== 0 ? studentsCourses : [],
                class: data["Class"] !== null ? data.Class["classname"] : ''
            })
        })

        return studentsData
    }

    // select one student
    oneStudent = async (req: Request, res: Response) => {
        const findStudent: any = await Students.findByPk(req.params.id, {
            include: [
                {
                    model: Classes,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Courses,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                }
            ]
        })
        // console.log(findStudent)

        if (findStudent !== null) {

            const findCourses = findStudent.Courses
            let eachCourse: any = []
            findCourses.forEach((course: { dataValues: any }) => {
                eachCourse.push(course.dataValues.coursename)
            })

            res.status(200).json({
                id: findStudent.id,
                firstname: findStudent?.firstname,
                lastname: findStudent?.lastname,
                age: findStudent?.age,
                Class: findStudent.Class !== null ? findStudent.Class["classname"] : "None",
                Course: eachCourse.length !== 0 ? eachCourse : "None"
            })
        } else {
            res.status(400)
            throw new Error('Student do not exist')
        }
    }

    // Add a course
    setCourse = async (req: Request, res: Response) => {
        let std: any = await Students.findByPk(req.params.id, {
            include: [
                { model: Courses }
            ]
        })

        if (std) {
            await std.setCourses([])
            for (let item: number = 0; item < req.body.coursename.length; item++) {
                const course = await Courses.findByPk(req.body.coursename[item])
                if (!course) {
                    res.status(400)
                    throw new Error(`${item} don't exist`)
                } else {
                    await std.addCourse(course)
                }
            }

            const newstd: any = await Students.findByPk(req.params.id, {
                include: [{
                    model: Courses
                }]
            })

            res.status(200).json({
                id: newstd?.dataValues.id,
                firstname: newstd?.dataValues.firstname,
                lastname: newstd?.dataValues.lastname,
                age: newstd?.dataValues.age,
                ClassId: newstd?.dataValues.ClassId,
                courses: newstd?.dataValues.Courses.map((course: any) => {
                    return ({
                        id: course.id,
                        course: course.coursename
                    })
                })

            })

        } else {
            res.status(400).json({
                message: "Student don't exist"
            })
        }
    }

    // select a class
    setClass = async (req: Request, res: Response) => {
        const className = await Classes.findOne({ where: { classname: req.body.classname } })
        let std = await Students.findByPk(req.params.id)
        if (className) {
            if (std?.ClassId === className.id) {
                res.status(200).json({
                    message: `Already enrolled in class ${className.classname}`
                })
            } else {
                await std?.setClass(className)
                std = await Students.findByPk(req.params.id)
                res.status(200).json(std)
            }
        } else {
            res.status(400)
            throw new Error("Class don't exist")
        }
    }

    // login student
    loginStudent = async (req: Request, res: Response) => {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400)
            throw new Error('Please complete all fields')
        }

        const getStudent: any = await Students.findOne({
            where: { firstname: req.body.username },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        if (await bcrypt.compare(password, getStudent?.password)) {
            const token = this.generateToken(getStudent.id)
            res.send({
                id: getStudent.id,
                firstname: getStudent.firstname,
                lastname: getStudent.lastname,
                token
            })
        } else {
            res.status(400)
            throw new Error("Invalid credentials")
        }

    }

    // Create a student
    createStudent = async (req: Request, res: Response) => {
        if (!req.body.firstname || !req.body.lastname || !req.body.age || !req.body.password) {
            res.status(400)
            throw new Error('Please complete all fields')
        }

        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(req.body.password, salt)

        // console.log(req.body.firstname)
        try {

        } catch (error) {

        }
        const std = await Students.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            password: hashedpassword
        })

        const token = this.generateToken(std.id)

        if (req.body.classname) {
            await std.setClass(req.body.classname)
        }
        if (req.body.courseData) {

            const arrayCourse = await Courses.findAll()
            const results = arrayCourse.map((item: any) => {
                return item.dataValues.id
            })
            await std.addCourse(req.body.courseData)
        }

        // if (req.body.classname) {
        //     const classid: any = await Classes.findOne({ where: { classname: req.body.classname } })
        //     await std.setClass(classid)
        // }

        // if (req.body.coursename) {

        //     if (req.body.coursename.map((course: number) => { return results.includes(course) }).includes(false)) {
        //         throw new Error('One of the courses provided do not exist.')
        //     }
        //     for (let i: number = 0; i < req.body.coursename.length; i++) {

        //         await std.addCourse(req.body.coursename[i])

        //     }
        // }

        const newStd: any = await Students.findByPk(std.id, {
            include: [
                {
                    model: Courses,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Classes,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
        })

        res.status(200).json(
            {
                id: newStd.id,
                firstname: newStd?.firstname,
                lastname: newStd?.lastname,
                age: newStd?.age,
                token
            }
        )
    }

    // update student
    updateStudent = async (req: Request, res: Response) => {
        const std: any = await Students.findByPk(req.params.id, {
            include: [
                {
                    model: Courses
                }
            ]
        })

        if (!std) {
            res.status(400)
            throw new Error('Student not found')
        }
        let courseid = null
        let classid: any = null
        console.log(req.body.courseData)
        if (req.body.courseData) {
            courseid = await Courses.findOne({ where: { coursename: req.body.courseData } })
            await std.addCourse(courseid)
            // await std.setCourses([])
            // for (let i: number = 0; i < req.body.courseData.length; i++) {
            //     courseid = await Courses.findByPk(req.body.courseData[i])
            //     if (!courseid) {
            //         res.status(400)
            //         throw new Error("Wrong course name")
            //     } else {
            //         await std.addCourse(req.body.courseData[i])
            //     }
            // }
        }

        let hashedpassword
        if (req.body.password) {
            const salt = await bcrypt.genSalt()
            hashedpassword = await bcrypt.hash(req.body.password, salt)
        }

        if (req.body.classname) {
            // console.log("there is a classname")
            try {
                classid = await Classes.findOne({ where: { classname: req.body.classname } })
                // console.log(classid)
                await std.setClass(classid)
            } catch (error) {
                res.status(401)
                throw new Error('Invalid class name')
            }
        } else {
            // console.log("No classname")
        }

        await Students.update({ firstname: req.body.firstname ? req.body.firstname : std.firstname, lastname: req.body.lastname ? req.body.lastname : std.lastname, age: req.body.age ? req.body.age : std.age, password: req.body.password ? hashedpassword : std.password }, {
            where: {
                id: req.params.id
            }
        })
        const updtedstd = await Students.findByPk(req.params.id, {
            include: [
                {
                    model: Courses,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        })

        res.status(200).json(updtedstd)

    }

    // Remove a course
    removeCourse = async (req: Request, res: Response) => {
        const std = await Students.findByPk(req.params.id)
        if (!std) {
            res.status(400)
            throw new Error('Student do not exist')
        }
        let courseid: any
        console.log(req.body)
        for (let i: number = 0; i < req.body.removeCourseData.length; i++) {
            courseid = await Courses.findOne({ where: { coursename: req.body.removeCourseData[i] } })
            // console.log(courseid?.dataValues)
            if (!courseid) {
                res.status(400)
                throw new Error("Wrong course name")
            } else {
                await std.removeCourse(courseid.id)
            }
        }
    }

    // delete student
    deleteStudent = async (req: Request, res: Response) => {
        const std = await Students.findByPk(req.params.id)
        // console.log(std)

        if (!std) {
            res.status(400)
            throw new Error("Student do not exist")
        }

        try {

            await Students.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json(std)

        } catch (error) {
            res.status(401)
            throw new Error
        }
    }

    generateToken = (id: any) => {
        return jwt.sign({ id }, process.env.JWT_SECRET!)
    }

}

