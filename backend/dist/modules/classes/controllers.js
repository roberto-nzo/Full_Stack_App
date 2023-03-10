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
const classes_1 = __importDefault(require("../../models/classes"));
const students_1 = __importDefault(require("../../models/students"));
// Select all classes
const allClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield index_1.default.Classes.findAll({
        include: {
            model: index_1.default.Students,
            // separate: true,
            attributes: { exclude: ['createdAt', 'updatedAt', 'ClassId'] }
        }
    });
    const mapClasses = classes.map((clas) => {
        return ({
            id: clas.id,
            class: clas.classname,
            students: clas.Students
        });
    });
    console.log(mapClasses);
    res.status(200).json(mapClasses);
});
// Select one class
const oneClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield index_1.default.Classes.findByPk(req.params.id);
    if (!classes) {
        res.status(400);
    }
    res.status(200).json(classes);
});
// Create a class
const createclass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.classname || !req.body.student) {
        res.status(400);
        throw new Error('Please complete all fields');
    }
    else {
        const student = yield students_1.default.findByPk(req.body.student);
        const classes = yield classes_1.default.create({
            classname: req.body.classname,
        });
        student === null || student === void 0 ? void 0 : student.setClass(classes);
        res.status(200).json(classes);
    }
});
// Update a class
const updtClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield classes_1.default.findByPk(req.params.id);
    if (!classes) {
        res.status(400);
        throw new Error('Class not found');
    }
    const updtClass = yield classes_1.default.update({ classname: req.body.classname ? req.body.classname : classes.classname }, {
        where: {
            id: req.params.id
        }
    });
    const updtedclass = yield classes_1.default.findByPk(req.params.id);
    res.status(200).json(updtedclass);
});
// Delete a class
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield classes_1.default.findByPk(req.params.id);
    if (!classes) {
        res.status(400);
        throw new Error("Student do not exist");
    }
    yield classes_1.default.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(classes);
});
exports.default = { allClasses, oneClass, createclass, updtClass, deleteClass };
