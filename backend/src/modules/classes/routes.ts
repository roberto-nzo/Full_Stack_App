import express from 'express'

const router = express.Router()

import routes from './controllers'

router.route('/classes').get(routes.allClasses).post(routes.createclass)
router.route('/classes/:id').get(routes.oneClass).put(routes.updtClass).delete(routes.deleteClass)

module.exports = router