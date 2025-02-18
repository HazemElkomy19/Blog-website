import  express  from "express";
import {body} from "express-validator";
export const router=express.Router();
import {
  
 getSinglePost,
 deletePost,
 updatePost,
 formPage,
 editPage,
 addPost
} from '../controllers/posts.controller.js';






router.route("/formPost").get(formPage);
router.route("/submit/post").post(addPost);

router.route("/:postId")
      .get(getSinglePost)
      .delete(deletePost)
      .put(updatePost);

router.route("/EditPost/:postId").get(editPage);     