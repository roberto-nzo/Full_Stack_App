import { Request, Response } from 'express'
import ClassService from "./service"

const classService = new ClassService()


// Select all classes
const allClasses = async (req: Request, res: Response) => {
    const allclasses = await classService.allClasses(res)
    res.status(200).json(allclasses)
}

// Select one class
const oneClass = async (req: Request, res: Response) => {
    const oneclass = await classService.oneClass(req, res)
    res.status(200).json(oneclass)
}

// Create a class
const createclass = async (req: Request, res: Response) => {
    const createclass = await classService.createClass(req, res)
    res.status(200).json(createclass)
}

// Update a class
const updtClass = async (req: Request, res: Response) => {
    const updateClass = await classService.updateClass(req, res)
    res.status(200).json(updateClass)
}

// Delete a class
const deleteClass = async (req: Request, res: Response) => {
    const deleteClass = await classService.deleteClass(req, res)
    res.status(200).json(deleteClass)
}

export default { allClasses, oneClass, createclass, updtClass, deleteClass }