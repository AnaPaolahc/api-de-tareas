require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { createClient } = require('redis')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const tareasRoutes = require('./routes/tareas')

const app = express()
const redisClient = createClient()
redisClient.connect().catch(console.error)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, maxAge: 86400000 },
}))

app.use('/api', authRoutes)

// Rutas de tareas
app.use('/tareas', tareasRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3001, () => console.log('Backend en http://localhost:3001'))
}).catch(err => {
  console.error('Error conectando a MongoDB:', err)
})
