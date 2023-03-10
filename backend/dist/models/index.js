"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = __importDefault(require("./courses"));
const classes_1 = __importDefault(require("./classes"));
const students_1 = __importDefault(require("./students"));
courses_1.default.belongsToMany(students_1.default, { through: 'StudentsCourses' });
students_1.default.belongsToMany(courses_1.default, { through: 'StudentsCourses' });
classes_1.default.hasMany(students_1.default);
students_1.default.belongsTo(classes_1.default);
exports.default = { Courses: courses_1.default, Students: students_1.default, Classes: classes_1.default };
