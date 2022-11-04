const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

AuthSchema.methods.passwordEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10) // Seed
    return await bcrypt.hash(password, salt)
}

AuthSchema.methods.checkPassword = async function( password ) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Auth', AuthSchema)