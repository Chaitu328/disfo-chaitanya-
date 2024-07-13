// to verify auth
require('dotenv').config()

const express = require('express');
const app = new express();
const mangoose = require('mongoose');

// to parse json
app.use(express.json())



const PORT = 8082
const MONGOOSE_URL = "mongodb://127.0.0.1:27017";
mangoose.connect(MONGOOSE_URL).then(() => console.log("DB is Connected")).catch((err) => console.error({ err: err.message }))

const discussionRouter = require("./routes/discussion.routes")
app.use('/discussions', discussionRouter)
app.listen(PORT, () => {
    console.log("Server is listining at PORT", PORT)
})