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
const index_1 = __importDefault(require("../../models/index"));
const courses_1 = __importDefault(require("../../models/courses"));
const students_1 = __importDefault(require("../../models/students"));
// Select all courses
const allcourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield index_1.default.Courses.findAll({
        include: [
            {
                model: students_1.default,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ]
    });
    // console.log(courses.map((course: any) => { return course.Students }))
    res.status(200).json(courses);
});
// Select one course
const oneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_1.default.Courses.findByPk(req.params.id, {
        include: [{
                model: students_1.default,
                attributes: { exclude: ['createdAt', 'updatedAt', 'age', 'ClassId', 'StudentsCourses'] }
            }]
    });
    if (!course) {
        res.status(400).json({
            message: `Course of id ${req.params.id} don't exist!`
        });
    }
    else {
        res.status(200).json({
            id: course === null || course === void 0 ? void 0 : course.id,
            course: course === null || course === void 0 ? void 0 : course.coursename,
            students: course.Students.map((std) => {
                return ({
                    id: std.id,
                    firstname: std.firstname,
                    lastname: std.lastname
                });
            })
        });
    }
});
// Create a course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.courseData) {
        res.status(400);
        throw new Error('Please complete all fields');
    }
    else {
        try {
            const course = yield courses_1.default.create({
                coursename: req.body.courseData,
            });
            if (req.body.student) {
                const student = yield students_1.default.findByPk(req.body.student);
                yield (student === null || student === void 0 ? void 0 : student.addCourse(course));
            }
            res.status(200).json(course);
        }
        catch (error) {
            res.status(400);
            throw new Error;
        }
    }
});
// Update a course
const updtCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courses_1.default.findByPk(req.params.id);
    if (!course) {
        res.status(400);
        throw new Error('Course not found');
    }
    const updtedCourse = yield courses_1.default.update({ coursename: req.body.coursename ? req.body.coursename : course.coursename }, {
        where: {
            id: req.params.id
        }
    });
    const updtedcourse = yield courses_1.default.findByPk(req.params.id);
    res.status(200).json(updtedcourse);
});
// Delete a course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courses_1.default.findByPk(req.params.id);
    if (!course) {
        res.status(400);
        throw new Error("Class do not exist");
    }
    yield courses_1.default.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(course);
});
exports.default = { allcourses, oneCourse, createCourse, updtCourse, deleteCourse };
