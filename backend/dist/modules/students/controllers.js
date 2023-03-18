"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const students_1 = __importDefault(require("../../models/students"));
const service_1 = __importDefault(require("./service"));
// const multer = require('multer')
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const studentService = new service_1.default();
// Select all students
const allStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentsData = yield studentService.getAllStudents();
    res.status(200).json(studentsData);
}));
// Login student
const loginStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchStudent = yield studentService.loginStudent(req, res);
    res.status(200).json(fetchStudent);
}));
// Select one student
const oneStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oneStudent = yield studentService.oneStudent(req, res);
    res.status(200).json(oneStudent);
}));
// Upload image
const uploadImage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const std = yield students_1.default.findByPk(req.params.id);
        cb(null, (std === null || std === void 0 ? void 0 : std.dataValues.id) + path_1.default.extname(file.originalname));
    })
});
const upload = (0, multer_1.default)({ storage: uploadImage });
// Create a student
const createStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createStudent = yield studentService.createStudent(req, res);
    res.status(200).json(createStudent);
}));
// Student select a course
const selectCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addCourse = yield studentService.setCourse(req, res);
    res.status(200).json(addCourse);
}));
// Student remove a course
const removeCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const removeCourse = yield studentService.removeCourse(req, res);
    res.status(200).json(removeCourse);
}));
// Student select a class
const selectClass = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setClass = yield studentService.setClass(req, res);
    res.status(200).json(setClass);
}));
// Update a student
const updtstudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateStudent = yield studentService.updateStudent(req, res);
    res.status(200).json(updateStudent);
}));
// Delete a student
const deleteStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteStudent = yield studentService.deleteStudent(req, res);
    res.status(200).json(deleteStudent);
}));
exports.default = { allStudents, oneStudent, createStudent, updtstudent, deleteStudent, selectCourse, removeCourse, selectClass, loginStudent, upload };
