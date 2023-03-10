import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler"
import Students from "../models/students";
import { Response, Request } from "express"

const protect = expressAsyncHandler(async (req: any, res: Response, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
            req.student = await Students.findByPk(decoded.id)

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect