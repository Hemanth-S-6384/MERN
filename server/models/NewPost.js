const mongoose = require('mongoose')

const NewPostsSchema = new mongoose.Schema({
    imgUrl: String,
    name: String,
    description: String,
    option:String
})

const NewPostModel=mongoose.model("newposts",NewPostsSchema)

module.exports=NewPostModel