const express = require('express')
const {faker} = require('@faker-js/faker')

const generatePost = () => {

    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(),
    }

    // Testear
    // console.log(post)

    return post
}

module.exports = {
    generatePost
}


