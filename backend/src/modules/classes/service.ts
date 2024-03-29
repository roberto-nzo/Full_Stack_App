import { Request, Response } from "express"
import models from "../../models"

export default class ClassService {
    // Get all classes
    allClasses = async () => {
        const classes: any = await models.Classes.findAll({
            include: {
                model: models.Students,
                attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'ClassId'] }
            }
        })
        const mapClasses = classes.map((clas: any) => {
            return ({
                id: clas.id,
                class: clas.classname,
                students: clas.Students
            })
        })

        return mapClasses
    }

    // Get one class
    oneClass = async (req: Request, res: Response) => {
        try {
            const classes = await models.Classes.findByPk(req.params.id)
            res.status(200).json(classes)
        } catch (error) {
            res.status(401)
            throw new Error("Class do not exist")
        }

    }

    // Create a class
    createClass = async (req: Request, res: Response) => {
        try {
            if (!req.body.classname) {
                res.status(400)
                throw new Error('Fill required field!')
            }
            const fetchClass = await models.Classes.findOne({ where: { classname: req.body.classname } })
            if (!fetchClass) {
                const classes = await models.Classes.create({
                    classname: req.body.classname,
                })
                if (req.body.student) {
                    const student = await models.Students.findByPk(req.body.student)
                    student?.setClass(classes)
                }
                res.status(200).json(classes)
            }

        } catch (error) {
            res.status(401)
            throw new Error('Something went wrong')
        }
    }

    // Update a class
    updateClass = async (req: Request, res: Response) => {
        const classes = await models.Classes.findByPk(req.params.id)

        if (!classes) {
            res.status(400)
            throw new Error('Class not found')
        }

        await models.Classes.update({ classname: req.body.classname ? req.body.classname : classes.classname }, {
            where: {
                id: req.params.id
            }
        })

        const updtedclass = await models.Classes.findByPk(req.params.id)

        res.status(200).json(updtedclass)
    }

    // Delete a class
    deleteClass = async (req: Request, res: Response) => {
        try {
            const classes = await models.Classes.findByPk(req.params.id)

            await models.Classes.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(classes)
        } catch (error) {
            res.status(401)
            throw new Error("Something went wrong")
        }

    }
}