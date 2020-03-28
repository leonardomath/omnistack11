const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const route = express.Router()

route.post('/session', SessionController.store)

route.post('/ongs', OngController.store)
route.get('/ongs', OngController.index)
route.post('/incidents', IncidentController.store)
route.get('/incidents', IncidentController.index)
route.delete('/incidents/:id', IncidentController.delete)
route.get('/profile', ProfileController.index)

module.exports = route