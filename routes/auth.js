const express = require('express')
const authController = require('../controllers/auth')
const routerAuth = express.Router()

// Routes

routerAuth.get('/auth/signup', authController.showAuthFormSignUp)
routerAuth.post('/auth/signup', authController.signup)

routerAuth.get('/auth/signin', authController.showAuthFormSignIn)
routerAuth.post('/auth/signin', authController.signin)

routerAuth.get('/auth/profile', authController.profile)

routerAuth.get('/auth/logout', authController.logout)

module.exports = {
    routerAuth
}