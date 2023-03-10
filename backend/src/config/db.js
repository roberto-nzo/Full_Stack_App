// import { Sequelize } from "sequelize";
const sequelize = require('sequelize')

const DB = async () => {
    try {
        const db = new sequelize.Sequelize(`mysql://root:@localhost:${process.env.PORT_DB}/school-sys`, {
            logging: false
        })
        await db.authenticate()
        console.log(`Connection has been established on port ${process.env.PORT_DB}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = DB