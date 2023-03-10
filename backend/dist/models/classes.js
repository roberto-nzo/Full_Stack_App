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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new sequelize_1.Sequelize(`${process.env.MYSQL_URL}`, {
        logging: false
    });
}
else {
    sequelize = new sequelize_1.Sequelize('mysql://root:@localhost:3306/school-sys', {
        logging: false
    });
}
class Classes extends sequelize_1.Model {
}
Classes.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    classname: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize,
    tableName: 'classes'
});
function classes() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
    });
}
classes();
exports.default = Classes;
