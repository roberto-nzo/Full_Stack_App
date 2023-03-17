import { Request, Response } from 'express'
import CourseService from './service'

const courseService = new CourseService()


// Select all courses
const allcourses = async (req: Request, res: Response) => {
    const allcourses = await courseService.allCourses(res)
    res.status(200).json(allcourses)
}

// Select one course
const oneCourse = async (req: Request, res: Response) => {
    const onecourse = await courseService.oneCourse(req, res)
    res.status(200).json(onecourse)
}

// Create a course
const createCourse = async (req: Request, res: Response) => {
    const createcourse = await courseService.createCourse(req, res)
    res.status(200).json(createcourse)
}

// Update a course
const updtCourse = async (req: Request, res: Response) => {
    const updateCourse = await courseService.updateCourse(req, res)
    res.status(200).json(updateCourse)
}

// Delete a course
const deleteCourse = async (req: Request, res: Response) => {
    const deleteCourse = await courseService.deleteCourse(req, res)
    res.status(200).json(deleteCourse)
}

export default { allcourses, oneCourse, createCourse, updtCourse, deleteCourse }