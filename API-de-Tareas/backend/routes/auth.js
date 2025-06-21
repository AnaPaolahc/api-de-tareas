const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
  const { usuario, password, nombre, email, foto } = req.body
  if (!usuario || !password || !nombre || !email) return res.status(400).json({ mensaje: 'Faltan campos' })

  const existe = await User.findOne({ usuario })
  if (existe) return res.status(400).json({ mensaje: 'Ya existe' })

  const nuevo = new User({ usuario, password, nombre, email, foto })
  await nuevo.save()

  req.session.userId = nuevo._id
  req.session.usuario = usuario
  req.session.nombre = nombre
  req.session.email = email
  req.session.foto = foto

  res.json({ mensaje: 'Registrado' })
})

router.post('/login', async (req, res) => {
  const { usuario, password } = req.body
  const user = await User.findOne({ usuario })
  if (!user || user.password !== password) return res.status(401).json({ mensaje: 'Credenciales inválidas' })

  req.session.userId = user._id
  req.session.usuario = user.usuario
  req.session.nombre = user.nombre
  req.session.email = user.email
  req.session.foto = user.foto

  res.json({ mensaje: 'Login exitoso' })
})

router.get('/me', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ mensaje: 'No autenticado' })
  res.json({ usuario: req.session.usuario, nombre: req.session.nombre, email: req.session.email, foto: req.session.foto })
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ mensaje: 'Sesión cerrada' })
  })
})

module.exports = router