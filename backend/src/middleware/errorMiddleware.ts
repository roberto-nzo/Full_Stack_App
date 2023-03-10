import { Request, Response, NextFunction } from "express"
const { stack } = require('../modules/students/routes')

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = { errorMiddleware }