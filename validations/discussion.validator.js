const joi = require('joi');

const discussionValidSchema = joi.object().keys({
    title : joi.string().max(150).required(),
    author: joi.string().required(),
    content: joi.string()
})

const validDiscussion = (data)=>{
    return discussionValidSchema.validate(data)
}

module.exports = validDiscussion