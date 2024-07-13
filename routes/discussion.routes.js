const router = require('express').Router();
const { postNew, getall1,getSearchByUsername,getSearchById,deleteByID,patchByID } = require('../controller/discussion.controller');
const { fetchUserInCollection } = require("../middleware/discussion.middleware")
const ValidateUserAuth = require("../middleware/verifyAuth")

router.post('/new', fetchUserInCollection, postNew)

router.get("/all1",ValidateUserAuth, getall1)

router.get("/user/:username",getSearchByUsername);

router.get("/id/:id",getSearchById)

// checkpoint 2 
router.delete("/id/:id",deleteByID)

router.patch("/id/:id",patchByID)

module.exports = router