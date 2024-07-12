const router = require('express').Router();
const {postNew,getall1} = require('../controller/discussion.controller');
const {fetchUserInCollection} = require("../middleware/discussion.middleware")

router.post('/new',fetchUserInCollection,postNew)

router.get("/all1",getall1)

module.exports = router