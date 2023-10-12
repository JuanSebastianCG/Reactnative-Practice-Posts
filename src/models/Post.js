
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    active:{type:Boolean, required:true}


})

module.exports=mongoose.model('Post',PostSchema)