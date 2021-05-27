//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const loadash = require("lodash");

const mongoose = require("mongoose");
const { constant } = require("lodash");
mongoose.connect(
 env.mongooseUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const blogScehema = new mongoose.Schema({
  title: String,
  body: String,
});

const BlogPost = mongoose.model("BlogPost", blogScehema);
mongoose.set("useFindAndModify", false);

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutPageContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactPageContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  BlogPost.find((err, doc) => {
    if (!err) {
      res.render("home", {
        homeContent: homeStartingContent,
        blog: doc,
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutPageContent,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactPageContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const postData = new BlogPost({
    title: req.body.blogTitle,
    body: req.body.blogBody,
  });

  postData.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postID", function (req, res) {
  PostId = req.params.postID;

  BlogPost.findOne({ _id: PostId }, (err, blog) => {
    if (!err) {
      res.render("post", {
        contentTitle: blog.title,
        contentPara: blog.body,
      });
    }
  });
});

app.post("/delete", (req, res) => {
  BlogPost.findByIdAndRemove(req.body.deleteID, (err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(4000, function () {
  console.log("Server started on port 3000");
});
