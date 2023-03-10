"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv').config();
const cors = require('cors');
const colors = require('colors');
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('mysql://root:@localhost:3306/school-sys');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const DB = require('./config/db');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(multer)
app.use(cors());
app.use('/', require('./modules/classes/routes'));
app.use('/', require('./modules/students/routes'));
app.use('/', require('./modules/courses/routes'));
app.use(errorMiddleware);
const PORT = process.env.PORT || 8000;
// DB()
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
