const discussion = require("../models/discussion.models")

const fetchUserInCollection = async (req, res, next) => {
    const { author } = req.body
    // console.log(author)
    const existingUser = await discussion.findOne({ author });
    console.log(existingUser)
    if (existingUser) {
        return res.status(404).json({
            message: "user not found", author
        })
    }
    next()
}

module.exports = { fetchUserInCollection }