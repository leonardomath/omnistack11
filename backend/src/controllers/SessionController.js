const connection = require('../database/connection')

class SessionController {
  async store(req, res) {
    const { id } = req.body

    const ong = await connection('ongs').where('id', id).select('name').first() // first para nao retornar um array

    if (!ong) {
      res.status(400).json({ error: 'Ong not found with this id' })
    }

    return res.json(ong)
  }
}

module.exports = new SessionController()