"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = __importDefault(require("./controllers"));
router.route('/courses').get(controllers_1.default.allcourses).post(controllers_1.default.createCourse);
router.route('/courses/:id').get(controllers_1.default.oneCourse).put(controllers_1.default.updtCourse).delete(controllers_1.default.deleteCourse);
module.exports = router;
