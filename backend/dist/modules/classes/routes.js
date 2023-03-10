"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = __importDefault(require("./controllers"));
router.route('/classes').get(controllers_1.default.allClasses).post(controllers_1.default.createclass);
router.route('/classes/:id').get(controllers_1.default.oneClass).put(controllers_1.default.updtClass).delete(controllers_1.default.deleteClass);
module.exports = router;
