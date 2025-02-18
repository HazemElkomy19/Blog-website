import mongoose from "mongoose";
const postSchema=mongoose.Schema({
  title:{
    type:String,
  required:true
  },
  content:{
    type:String,
    required:true
  }
})

export const Post = mongoose.model('Post', postSchema);