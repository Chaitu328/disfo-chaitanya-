
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
        res.status(200).json(discussionDocument)
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
            return res.status(404).json({ message: "No discussions found for this user", id });
        }
        res.status(200).json(userID)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const deleteByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { author } = req.body;
        // Check if the document with the given ID exists
        const discussion = await discussionInstance.findByID(id);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }
        // Check if the author of the document matches the author provided in the request body
        if (discussion.author !== author) {
            return res.status(403).json({ message: "Unable to verify author" });
        }

        // If authorized, proceed with deletion
        const deleteData = await discussionInstance.delete(id);
        res.status(200).json(deleteData);
    } catch (err) {
        return res.status(500).json({ message: "Unauthorized Access" });
    }

}

const patchByID = async (req, res) => {
    try {
        const { id } = req.params
        const filter = {
            _id: id
        };
        const update = req.body;
        const options = { new: true };

        // check if discussion is found in id
        const findData = await discussionInstance.findByID(id)
        if (!findData) {
            res.status(404).json({ message: "Discussion not found" })
        }

        if (findData.author !== update.author) {
            res.status(403).json({ message: " Unable to verify author" })
        }

        const updateData = await discussionInstance.patch(filter, update, options)
        res.status(200).json(updateData);
    } catch (err) {
        return res.status(500).json({ message: "Unauthorized Access" });
    }
}

module.exports = { postNew, getall1, getSearchByUsername, getSearchById, deleteByID, patchByID }