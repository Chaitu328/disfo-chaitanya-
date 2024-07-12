const { required } = require('joi')
const mongoose = require('mongoose')
const validator = require('validator')

const discussionSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 150,
        required: true,
    },
    author: {
        type: String,
        required: true,
        immutable: true,
    },
    content: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
}
)

const discussionModel = mongoose.model("discussions", discussionSchema)

module.exports = discussionModel