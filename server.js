// const express = require('express')() <= esto me ahorra a la hora de poner en "app" el "express()". Siendo en este caso solamente express
const express = require('express')
const routerIndex = require('./routes')
const { dbConnection } = require('./controllers/config')
const { routerDev } = require('./routes/db')
const { routerPosts } = require('./routes/posts')
const { engine } = require('express-handlebars')
require('dotenv').config()

// Inicializo la aplicación de express
const app = express()

// Conectarme a la DB
dbConnection()

// Template Engine
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs') // El nombre debe ser el mismo que "extname"
app.set('views', './views')

// Middelwares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Routes
app.use('/', routerIndex)
app.use('/', routerDev) // Solo para desarrollo
app.use('/', routerPosts)

const PORT = process.env.PORT
app.listen(PORT, err => {
    if( err) throw new Error(`Ocurrio un error en el servidor: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})