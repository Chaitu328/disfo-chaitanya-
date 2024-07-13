const router = require('express').Router();
const { postNew, getall1,getSearchByUsername } = require('../controller/discussion.controller');
const { fetchUserInCollection } = require("../middleware/discussion.middleware")
const ValidateUserAuth = require("../middleware/verifyAuth")

router.post('/new', fetchUserInCollection, postNew)

router.get("/all1",ValidateUserAuth, getall1)

router.get("/user/:username",getSearchByUsername)
module.exports = router