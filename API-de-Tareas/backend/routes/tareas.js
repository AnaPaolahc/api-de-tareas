const express = require('express')
const router = express.Router()
const Tarea = require('../models/Tarea')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

function auth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ mensaje: 'No autenticado' })
  next()
}

router.get('/', auth, async (req, res) => {
  const tareas = await Tarea.find()
  res.json(tareas)
})

router.post('/', auth, upload.single('archivo'), async (req, res) => {
  const { titulo, descripcion } = req.body
  const tarea = new Tarea({ titulo, descripcion, completado: false, archivo: req.file?.filename })
  await tarea.save()
  res.json(tarea)
})

router.put('/:id', auth, async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(tarea)
})

router.delete('/:id', auth, async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id)
  res.json({ mensaje: 'Eliminado' })
})

module.exports = router
