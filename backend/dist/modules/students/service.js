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
const students_1 = __importDefault(require("../../models/students"));
const classes_1 = __importDefault(require("../../models/classes"));
const courses_1 = __importDefault(require("../../models/courses"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class StudentService {
    constructor() {
        this.getAllStudents = () => __awaiter(this, void 0, void 0, function* () {
            const fetchStudents = yield students_1.default.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: courses_1.default,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: classes_1.default,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ],
                order: [
                    ['id', 'ASC']
                ]
            });
            let studentsData = [];
            fetchStudents.forEach(item => {
                const data = item.dataValues;
                const courseitem = data.Courses;
                let studentsCourses = [];
                courseitem.forEach((std) => {
                    studentsCourses.push(std.coursename);
                });
                // console.log(studentsCourses)
                studentsData.push({
                    id: data.id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    age: data.age,
                    course: data["Courses"].length !== 0 ? studentsCourses : [],
                    class: data["Class"] !== null ? data.Class["classname"] : ''
                });
            });
            return studentsData;
        });
        // select one student
        this.oneStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const findStudent = yield students_1.default.findByPk(req.params.id, {
                include: [
                    {
                        model: classes_1.default,
                        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                    },
                    {
                        model: courses_1.default,
                        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                    }
                ]
            });
            console.log(findStudent);
            if (findStudent !== null) {
                const findCourses = findStudent.Courses;
                let eachCourse = [];
                findCourses.forEach((course) => {
                    eachCourse.push(course.dataValues.coursename);
                });
                res.status(200).json({
                    id: findStudent.id,
                    firstname: findStudent === null || findStudent === void 0 ? void 0 : findStudent.firstname,
                    lastname: findStudent === null || findStudent === void 0 ? void 0 : findStudent.lastname,
                    age: findStudent === null || findStudent === void 0 ? void 0 : findStudent.age,
                    Class: findStudent.Class !== null ? findStudent.Class["classname"] : "None",
                    Course: eachCourse.length !== 0 ? eachCourse : "None"
                });
            }
            else {
                res.status(400);
                throw new Error('Student do not exist');
            }
        });
        // Add a course
        this.setCourse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let std = yield students_1.default.findByPk(req.params.id, {
                include: [
                    { model: courses_1.default }
                ]
            });
            if (std) {
                yield std.setCourses([]);
                for (let item = 0; item < req.body.coursename.length; item++) {
                    const course = yield courses_1.default.findByPk(req.body.coursename[item]);
                    if (!course) {
                        res.status(400);
                        throw new Error(`${item} don't exist`);
                    }
                    else {
                        yield std.addCourse(course);
                    }
                }
                const newstd = yield students_1.default.findByPk(req.params.id, {
                    include: [{
                            model: courses_1.default
                        }]
                });
                res.status(200).json({
                    id: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.id,
                    firstname: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.firstname,
                    lastname: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.lastname,
                    age: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.age,
                    ClassId: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.ClassId,
                    courses: newstd === null || newstd === void 0 ? void 0 : newstd.dataValues.Courses.map((course) => {
                        return ({
                            id: course.id,
                            course: course.coursename
                        });
                    })
                });
            }
            else {
                res.status(400).json({
                    message: "Student don't exist"
                });
            }
        });
        // select a class
        this.setClass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const className = yield classes_1.default.findOne({ where: { classname: req.body.classname } });
            let std = yield students_1.default.findByPk(req.params.id);
            if (className) {
                if ((std === null || std === void 0 ? void 0 : std.ClassId) === className.id) {
                    res.status(200).json({
                        message: `Already enrolled in class ${className.classname}`
                    });
                }
                else {
                    yield (std === null || std === void 0 ? void 0 : std.setClass(className));
                    std = yield students_1.default.findByPk(req.params.id);
                    res.status(200).json(std);
                }
            }
            else {
                res.status(400);
                throw new Error("Class don't exist");
            }
        });
        // login student
        this.loginStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400);
                throw new Error('Please complete all fields');
            }
            const getStudent = yield students_1.default.findOne({
                where: { firstname: req.body.username },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (yield bcryptjs_1.default.compare(password, getStudent === null || getStudent === void 0 ? void 0 : getStudent.password)) {
                const token = this.generateToken(getStudent.id);
                res.send({
                    id: getStudent.id,
                    firstname: getStudent.firstname,
                    lastname: getStudent.lastname,
                    token
                });
            }
            else {
                res.status(400);
                throw new Error("Invalid credentials");
            }
        });
        // Create a student
        this.createStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.firstname || !req.body.lastname || !req.body.age || !req.body.password) {
                res.status(400);
                throw new Error('Please complete all fields');
            }
            const arrayCourse = yield courses_1.default.findAll();
            const results = arrayCourse.map((item) => {
                return item.dataValues.id;
            });
            const salt = yield bcryptjs_1.default.genSalt();
            const hashedpassword = yield bcryptjs_1.default.hash(req.body.password, salt);
            const std = yield students_1.default.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                password: hashedpassword
            });
            const token = this.generateToken(std.id);
            if (req.body.classname) {
                yield std.setClass(req.body.classname);
            }
            if (req.body.courseData) {
                yield std.addCourse(req.body.courseData);
            }
            // if (req.body.classname) {
            //     const classid: any = await Classes.findOne({ where: { classname: req.body.classname } })
            //     await std.setClass(classid)
            // }
            // if (req.body.coursename) {
            //     if (req.body.coursename.map((course: number) => { return results.includes(course) }).includes(false)) {
            //         throw new Error('One of the courses provided do not exist.')
            //     }
            //     for (let i: number = 0; i < req.body.coursename.length; i++) {
            //         await std.addCourse(req.body.coursename[i])
            //     }
            // }
            const newStd = yield students_1.default.findByPk(std.id, {
                include: [
                    {
                        model: courses_1.default,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: classes_1.default,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ]
            });
            res.status(200).json({
                id: newStd.id,
                firstname: newStd === null || newStd === void 0 ? void 0 : newStd.firstname,
                lastname: newStd === null || newStd === void 0 ? void 0 : newStd.lastname,
                age: newStd === null || newStd === void 0 ? void 0 : newStd.age,
                token
            });
        });
        // update student
        this.updateStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const std = yield students_1.default.findByPk(req.params.id, {
                include: [
                    {
                        model: courses_1.default
                    }
                ]
            });
            if (!std) {
                res.status(400);
                throw new Error('Student not found');
            }
            let courseid = null;
            let classid = null;
            if (req.body.coursename) {
                yield std.setCourses([]);
                for (let i = 0; i < req.body.coursename.length; i++) {
                    console.log(req.body.coursename[i]);
                    courseid = yield courses_1.default.findByPk(req.body.coursename[i]);
                    if (!courseid) {
                        res.status(400);
                        throw new Error("Wrong course name");
                    }
                    else {
                        yield std.addCourse(req.body.coursename[i]);
                    }
                }
            }
            else { }
            let hashedpassword;
            if (req.body.password) {
                const salt = yield bcryptjs_1.default.genSalt();
                hashedpassword = yield bcryptjs_1.default.hash(req.body.password, salt);
            }
            if (req.body.classname) {
                classid = yield classes_1.default.findOne({ where: { classname: req.body.classname } });
                yield students_1.default.update({ firstname: req.body.firstname ? req.body.firstname : std.firstname, lastname: req.body.lastname ? req.body.lastname : std.lastname, age: req.body.age ? req.body.age : std.age, password: req.body.password ? hashedpassword : std.password, ClassId: classid.id ? classid.id : null }, {
                    where: {
                        id: req.params.id
                    }
                });
                const updtedstd = yield students_1.default.findByPk(req.params.id, {
                    include: [
                        {
                            model: courses_1.default,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ]
                });
                res.status(200).json(updtedstd);
            }
            else {
                yield students_1.default.update({ firstname: req.body.firstname ? req.body.firstname : std.firstname, lastname: req.body.lastname ? req.body.lastname : std.lastname, age: req.body.age ? req.body.age : std.age, password: req.body.password ? hashedpassword : std.password }, {
                    where: {
                        id: req.params.id
                    }
                });
                const updtedstd = yield students_1.default.findByPk(req.params.id, {
                    include: [
                        {
                            model: courses_1.default,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ]
                });
                res.status(200).json(updtedstd);
            }
        });
        // delete student
        this.deleteStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const std = yield students_1.default.findByPk(req.params.id);
            if (!std) {
                res.status(400);
                throw new Error("Student do not exist");
            }
            yield students_1.default.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(std);
        });
        this.generateToken = (id) => {
            return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
        };
    }
}
exports.default = StudentService;
