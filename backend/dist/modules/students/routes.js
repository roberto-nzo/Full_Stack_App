"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const router = express_1.default.Router();
const controllers_1 = __importDefault(require("./controllers"));
router.route('/students').get(authMiddleware_1.default, controllers_1.default.allStudents).post(controllers_1.default.upload.single('profilepic'), controllers_1.default.createStudent);
router.route('/students/:id').get(controllers_1.default.oneStudent).put(controllers_1.default.updtstudent).delete(controllers_1.default.deleteStudent);
router.route('/students/course/:id').patch(controllers_1.default.selectCourse);
router.route('/students/class/:id').patch(controllers_1.default.selectClass);
router.route('/students/login').post(controllers_1.default.loginStudent);
module.exports = router;
