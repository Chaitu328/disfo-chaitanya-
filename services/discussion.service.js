const Discussion = require("../models/discussion.models")

class discussionService {
    create = async (data) => {
        const document = new Discussion(data)
        return await document.save()
    }
    read = async () => {
        return await Discussion.find({})
    }
}

module.exports = discussionService