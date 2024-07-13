
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
    try {
        const data = await discussionInstance.read()
        if (data.length === 0) {
            return res.status(404).json({ message: "No Discussions found" });
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSearchByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        // console.log(username)
        const userData = await discussionInstance.find({ author: username });
        console.log(userData)
        if (!userData) {
            return res.status(404).json({ message: "No discussions found for this user", username });
        }
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSearchById = async (req, res) => {
    try {
        const { id } = req.params
        const userID = await discussionInstance.findByID(id);
        console.log(userID)
        if (!userID) {
            return res.status(404).json({ message: "No discussions found for this user", userID });
        }
        res.status(200).json(userID)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = { postNew, getall1, getSearchByUsername, getSearchById }