const connection = require('../database/connection')

class IncidentController {
  async store(req, res) {
    const ong_id = req.headers.auth
    const { title, description, value } = req.body

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.json({ id })
  }

  async index(req, res) {

    const { page = 1 } = req.query

    const [countIncidents] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5) // offset pular quantas informacoes
      .select(
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf')

    res.header('X-Total-Count', countIncidents['count(*)'])

    return res.json(incidents)
  }

  async delete(req, res) {
    const ong_id = req.headers.auth
    const { id } = req.params

    const incident = await connection('incidents').where('id', id).select('ong_id').first()

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "operation not permited" })
    }

    await connection('incidents').where('id', id).delete()

    return res.status(204).send() // no return content
  }
}

module.exports = new IncidentController()