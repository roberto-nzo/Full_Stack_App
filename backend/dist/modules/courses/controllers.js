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
const service_1 = __importDefault(require("./service"));
const courseService = new service_1.default();
// Select all courses
const allcourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allcourses = yield courseService.allCourses(res);
    res.status(200).json(allcourses);
});
// Select one course
const oneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const onecourse = yield courseService.oneCourse(req, res);
    res.status(200).json(onecourse);
});
// Create a course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createcourse = yield courseService.createCourse(req, res);
    res.status(200).json(createcourse);
});
// Update a course
const updtCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateCourse = yield courseService.updateCourse(req, res);
    res.status(200).json(updateCourse);
});
// Delete a course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCourse = yield courseService.deleteCourse(req, res);
    res.status(200).json(deleteCourse);
});
exports.default = { allcourses, oneCourse, createCourse, updtCourse, deleteCourse };
