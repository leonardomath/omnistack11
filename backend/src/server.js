const express = require('express')
const cors = require('cors')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV != 'production'

    this.database()
    this.middlewares()
    this.routes()
  }

  database() {
    // this.express.use(require('./database/connection'))
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(express.json())
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express