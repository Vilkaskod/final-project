const express = require('express')
const routerPosts = express.Router()

const controllers = require('../controllers/posts')
const isAuthenticated = require('../middlewares/isauthenticated')

// Rutas de INDEX
routerPosts.get('/', controllers.traerPostCards)
routerPosts.get('/posts', isAuthenticated, controllers.getPosts)
routerPosts.get('/posts/new', isAuthenticated, controllers.newPost)
routerPosts.get('/posts/edit/:id', isAuthenticated, controllers.showPostFormEdit)
routerPosts.get('/posts/:slug', isAuthenticated, controllers.showPosts)

routerPosts.post('/posts', isAuthenticated, controllers.createPost)

routerPosts.put('/posts/:id', isAuthenticated, controllers.editPost)

routerPosts.delete('/posts/:id', isAuthenticated, controllers.deletePost)



module.exports = {
    routerPosts
}