"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { stack } = require('../modules/students/routes');
const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    });
};
module.exports = { errorMiddleware };
