import express from 'express'
import protect from '../../middleware/authMiddleware'

const router = express.Router()

import routes from './controllers'

router.route('/students').get(protect, routes.allStudents).post(routes.upload.single('profilepic'), routes.createStudent)
router.route('/students/:id').get(routes.oneStudent).put(routes.updtstudent).delete(routes.deleteStudent)
router.route('/students/course/:id').patch(routes.selectCourse)
router.route('/students/class/:id').patch(routes.selectClass)
router.route('/students/login').post(routes.loginStudent)

module.exports = router