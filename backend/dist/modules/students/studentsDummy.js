"use strict";
// ------------1----------------
// const stds = await Students.findAll({
//     include: [
//         {
//             model: Courses,
//             through: {
//             attributes: ['coursename'] }
//         },
//         // {
//         //     model: Classes,
//         //     attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
//         // },
//     ],
// })
// const fetchStudents = await Students.findAll({ include: { all: true } })
// ------------2----------------
// console.log(fetchStudents)
// let stddata: {}[] = []
// let finaldata: {}[] = []
// fetchStudents.forEach(std => {
//     stddata.push(std.dataValues)
// })
// // console.log(stddata)
// stddata.forEach(std => {
//     finaldata.push(std)
// })
// console.log(finaldata)
// const stdsclasses = await Students.findAll({
//     include: [{
//         model: Classes,
//         attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
//     }]
// })
// let finaldata: {} = []
// let students: {}[] = []
// stds.forEach(async (std) => {
//     const studentdata = std.dataValues
//     const stdclass = await Classes.findOne({ where: { id: studentdata.ClassId } });
//     // console.log(students)
//     let classname = ''
//     if (stdclass) {
//         classname = stdclass?.dataValues.classname
//     } else {
//         classname = "None"
//     }
//     // console.log(stdclass?.dataValues.classname)
//     // console.log(classname)
//     students.push({
//         firstname: studentdata.firstname,
//         lastname: studentdata.lastname,
//         age: studentdata.age,
//         Class: classname
//     })
//     // console.log(students)
// })
// console.log((stds[6]).toJSON())
// console.log(allStudents)
// const students = await Students.findByPk(stds?.dataValues.id, {
//         include: [{
//             model: Courses,
//             through: { attributes: ['StudentId', 'CourseId'] }
//         }]
//     })
// console.log(stds)
