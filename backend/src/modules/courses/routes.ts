import express from 'express'
import protect from '../../middleware/authMiddleware'

const router = express.Router()

import routes from './controllers'

router.route('/courses').get(routes.allcourses).post(routes.createCourse)
router.route('/courses/:id').get(routes.oneCourse).put(routes.updtCourse).delete(routes.deleteCourse)

module.exports = router