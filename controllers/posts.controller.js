import {Post} from "../models/posts.models.js";
import { validationResult } from 'express-validator';

// export const getAllposts=async(req, res) => {
  
  
//   const posts= await Post.find();
  
//   res.render("index.ejs",{posts:posts});
  

 
// };
export const getSinglePost=async (req,res)=>{
  try {
    const post= await Post.findById(req.params.postId)
  
  if(!post){
    res.status(404).json({msg:"course not found"});
  }
  return res.render("dashBord.ejs",{post});
  } catch (error) {
   return res.status(400).json({msg:"Invalid id"});
  }
};

export const deletePost=async (req, res) => {
  const data = await Post.deleteOne({_id:req.params.postId});
  return res.status(200).json({ msg: "Post deleted successfully" });
 
};

export const updatePost=async(req, res) => {
  const postId=req.params.postId;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $set: { ...req.body } },
    { new: true } 
  );
  res.redirect('/');
};

export const editPage=async(req,res)=>{
  const post= await Post.findById(req.params.postId)
  res.render("EditPost.ejs",{post});
};


export const formPage=(req,res)=>{
  res.render("formPost.ejs");
};

export const addPost=async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors.array());
  }
  else{
    const newPost= new Post(req.body);
   await newPost.save();
   res.redirect("/");
  }
}