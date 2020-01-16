const express = require('express')
const { getLandingPage, getTestCsv } = require('./controllers/users')

const router = express.Router()

router.get('/', getLandingPage)
router.get('/api/csv', getTestCsv)

module.exports = router
