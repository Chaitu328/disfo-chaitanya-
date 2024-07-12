
const discussionService = require("../services/discussion.service")
const discussionInstance = new discussionService()
const validateDiscussion = require("../validations/discussion.validator")

const postNew = async (req, res) => {
    // joi validation
    const { error } = validateDiscussion(req.body)
    if (error) {
        return res.status(422).json({ error: error.details.map(detail => detail.message) });
    }
    // DB
    try {
        const discussionDocument = await discussionInstance.create(req.body)
        res.json(discussionDocument)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getall1 = async (req, res) => {
    const data = await discussionInstance.read()
    res.status(200).json(data)
}
module.exports = { postNew, getall1 }