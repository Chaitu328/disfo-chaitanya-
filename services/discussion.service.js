const Discussion = require("../models/discussion.models")

class discussionService {
    create = async (data) => {
        const document = new Discussion(data)
        return await document.save()
    }
    read = async () => {
        return await Discussion.find({})
    }
    find = async (data) => {
        // Service Method: Your find method in the service should not use {data} directly. Instead, it should pass the data object as it is.
        return await Discussion.findOne(data)
    }
    findByID = async (id) => {
        try {
            return await Discussion.findById(id);
        } catch (err) {
            return null;
        }
    }
    delete = async (id) => {
        return await Discussion.findOneAndDelete(id)
    }

    patch = async (filter, update, options) => {
        return await Discussion.findOneAndUpdate(filter, update, options)
    }
    put =async()=>{
        
    }
}

module.exports = discussionService