import Courses from "./courses";
import Classes from "./classes";
import Students from "./students";

Courses.belongsToMany(Students, { through: 'StudentsCourses' })
Students.belongsToMany(Courses, { through: 'StudentsCourses' })
Classes.hasMany(Students)
Students.belongsTo(Classes)

export default { Courses, Students, Classes }