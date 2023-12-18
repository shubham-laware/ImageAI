import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    prompt:{
        type:String,
        requires:true
    },

    photo:{
        type:String,
        required:true
    }
})

export const Post = mongoose.model("Post",postSchema)