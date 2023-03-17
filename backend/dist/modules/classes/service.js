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
const models_1 = __importDefault(require("../../models"));
class ClassService {
    constructor() {
        // Get all classes
        this.allClasses = (res) => __awaiter(this, void 0, void 0, function* () {
            const classes = yield models_1.default.Classes.findAll({
                include: {
                    model: models_1.default.Students,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'ClassId'] }
                }
            });
            const mapClasses = classes.map((clas) => {
                return ({
                    id: clas.id,
                    class: clas.classname,
                    students: clas.Students
                });
            });
            res.status(200).json(mapClasses);
        });
        // Get one class
        this.oneClass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = yield models_1.default.Classes.findByPk(req.params.id);
                res.status(200).json(classes);
            }
            catch (error) {
                res.status(401);
                throw new Error("Class do not exist");
            }
        });
        // Create a class
        this.createClass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.classname) {
                res.status(400);
                throw new Error('Please complete all fields');
            }
            else {
                const classes = yield models_1.default.Classes.create({
                    classname: req.body.classname,
                });
                if (req.body.student) {
                    const student = yield models_1.default.Students.findByPk(req.body.student);
                    student === null || student === void 0 ? void 0 : student.setClass(classes);
                }
                res.status(200).json(classes);
            }
        });
        // Update a class
        this.updateClass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const classes = yield models_1.default.Classes.findByPk(req.params.id);
            if (!classes) {
                res.status(400);
                throw new Error('Class not found');
            }
            yield models_1.default.Classes.update({ classname: req.body.classname ? req.body.classname : classes.classname }, {
                where: {
                    id: req.params.id
                }
            });
            const updtedclass = yield models_1.default.Classes.findByPk(req.params.id);
            res.status(200).json(updtedclass);
        });
        // Delete a class
        this.deleteClass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const classes = yield models_1.default.Classes.findByPk(req.params.id);
            if (!classes) {
                res.status(400);
                throw new Error("Student do not exist");
            }
            yield models_1.default.Classes.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(classes);
        });
    }
}
exports.default = ClassService;
