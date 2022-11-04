const { parse } = require('dotenv')
const { response } = require('express')
const Post = require('../models/posts')

// Mostrar los POSTS en CARDS

const traerPostCards = async (req, res = response) => {
    try {
        const posts = await Post.find({}).lean() //Objeto puro de JS

        // console.log(posts)

        const title = "Blog - Inicio"

        res.status(200).render('home',
            {
                title,
                posts
            }
        )

    } catch (error) {
        console.log("Error CARDS ", error)
    }
}


// INDEX
const getPosts = async (req, res = response) => {
    try {
        const posts = await Post.find({ user: req.user.id }).lean() //Objeto puro de JS

        // console.log(posts)

        const title = "Blog - Listado de Post"

        res.status(200).render('index',
            {
                title,
                posts
            }
        )

    } catch (error) {
        console.log("Error INDEX ", error)
    }
}

// SHOW
const showPosts = async (req, res = response) => {

    try {
        const post = await Post.findOne({ slug: req.params.slug }).lean()
        if (post === null) res.redirect('/')

        res.status(200).render('show',
            {
                title: `CompuBlog - ${post.title}`,
                post
            }
        )
    } catch (error) {
        console.log("Error SHOW ", error)
    }

}

// DELETE
const deletePost = async (req, res = response) => {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.redirect('/posts')
    } catch (error) {
        console.log("Error DELETE ", error)
    }
}

// NEW
const newPost = (req, res = response) => {
    res.status(200).render('new')
}

// CREATE
const createPost = async (req, res = response) => {

    try {
        // console.log(req.body)
        let post = new Post()

        post.title = req.body.title
        post.body = req.body.body
        post.user = req.user.id
        post.name = req.user.name

        post = await post.save()

        res.status(200).redirect(`/posts/${post.slug}`)
    } catch (error) {
        console.log("Error CREATE ", error)
    }
}

// Show Post Form

const showPostFormEdit = async (req, res = response) => {

    try {
        const post = await Post.findById(req.params.id).lean()

        res.status(200).render('edit',
            {
                title: 'Editando Post',
                post
            }
        )

    } catch (error) {
        console.log("Error SHOW POST FORM EDIT ", error)
    }
}

const editPost = async (req, res = response) => {

    const id = req.params.id
    const {title, body} = req.body

    try {
        await Post.findByIdAndUpdate({_id: id}, {title, body})

        res.redirect('/posts')
    } catch (error) {
        console.log("Error EDIT ", error)
    }

}

module.exports = {
    getPosts,
    showPosts,
    deletePost,
    newPost,
    createPost,
    showPostFormEdit,
    traerPostCards,
    editPost
}