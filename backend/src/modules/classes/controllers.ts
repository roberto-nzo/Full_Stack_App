import { Application, Request, Response, NextFunction } from 'express'
import models from '../../models/index'
import Classes from '../../models/classes'
import Students from '../../models/students'


// Select all classes
const allClasses = async (req: Request, res: Response) => {
    const classes: any = await models.Classes.findAll({
        include: {
            model: models.Students,
            // separate: true,
            attributes: { exclude: ['createdAt', 'updatedAt', 'ClassId'] }
        }
    })
    const mapClasses = classes.map((clas: any) => {
        return ({
            id: clas.id,
            class: clas.classname,
            students: clas.Students
        })
    }
    )
    console.log(mapClasses)
    res.status(200).json(mapClasses)
}

// Select one class
const oneClass = async (req: Request, res: Response) => {
    const classes = await models.Classes.findByPk(req.params.id)

    if (!classes) {
        res.status(400)
    }

    res.status(200).json(classes)
}

// Create a class
const createclass = async (req: Request, res: Response) => {
    if (!req.body.classname) {
        res.status(400)
        throw new Error('Please complete all fields')
    } else {
        const classes = await Classes.create({
            classname: req.body.classname,
        })
        if (req.body.student) {
            const student = await Students.findByPk(req.body.student)
            student?.setClass(classes)
        }
        res.status(200).json(classes)
    }
}

// Update a class
const updtClass = async (req: Request, res: Response) => {
    const classes = await Classes.findByPk(req.params.id)

    if (!classes) {
        res.status(400)
        throw new Error('Class not found')
    }

    const updtClass = await Classes.update({ classname: req.body.classname ? req.body.classname : classes.classname }, {
        where: {
            id: req.params.id
        }
    })

    const updtedclass = await Classes.findByPk(req.params.id)

    res.status(200).json(updtedclass)
}

// Delete a class
const deleteClass = async (req: Request, res: Response) => {
    const classes = await Classes.findByPk(req.params.id)

    if (!classes) {
        res.status(400)
        throw new Error("Student do not exist")
    }

    await Classes.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(classes)
}

export default { allClasses, oneClass, createclass, updtClass, deleteClass }