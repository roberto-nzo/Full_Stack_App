import express, { Application } from 'express'
const dotenv = require('dotenv').config()
const cors = require('cors')
const colors = require('colors')
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('mysql://root:@localhost:3306/school-sys')
const { errorMiddleware } = require('./middleware/errorMiddleware')
import multer from 'multer'
// const DB = require('./config/db')
const app: Application = express()

module.exports = (on: any, config: any) => {
    config.production.username = process.env.username
    config.production.password = process.env.password
    config.production.database = process.env.database
    config.production.host = process.env.host
    config.production.dialect = process.env.dialect
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(multer)
app.use(cors())

app.use('/', require('./modules/classes/routes'))
app.use('/', require('./modules/students/routes'))
app.use('/', require('./modules/courses/routes'))
app.use(errorMiddleware)


const PORT = process.env.PORT || 8000

// DB()

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
