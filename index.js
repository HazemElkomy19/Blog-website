import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {Post} from "./models/posts.models.js";
import methodOverride from 'method-override';
import { router as postsRoutes } from "./routes/postRoutes.js";
import 'dotenv/config';




const url=process.env.MONGO_URL;
mongoose.connect(url).then(()=>{
  console.log("mongodb connected successfully")
});
const app = express();
const port = process.env.PORT;
app.use(express.static("public"));

app.use('/images', express.static('images'));

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
const password="1234";
let userIsAuthorized = false;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/posts",postsRoutes);

function passwordCheck(req, res, next) {
  if (userIsAuthorized) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get("/login", (req, res) => {
  res.render("login.ejs");
});


app.post('/login', (req, res) => {
  const loginPassword = req.body.password;
  if (loginPassword === password) {
    userIsAuthorized = true;
    res.redirect('/');
  } else {
    userIsAuthorized = false;
    res.status(401).json({ message: 'Unauthorized access' });
  }
});


app.get("/", passwordCheck, async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("index.ejs", { posts: posts });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});