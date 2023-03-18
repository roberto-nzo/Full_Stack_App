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
const classService = new service_1.default();
// Select all classes
const allClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allclasses = yield classService.allClasses();
    res.status(200).json(allclasses);
});
// Select one class
const oneClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oneclass = yield classService.oneClass(req, res);
    res.status(200).json(oneclass);
});
// Create a class
const createclass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createclass = yield classService.createClass(req, res);
    res.status(200).json(createclass);
});
// Update a class
const updtClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateClass = yield classService.updateClass(req, res);
    res.status(200).json(updateClass);
});
// Delete a class
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteClass = yield classService.deleteClass(req, res);
    res.status(200).json(deleteClass);
});
exports.default = { allClasses, oneClass, createclass, updtClass, deleteClass };
