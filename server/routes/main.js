const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

// Routes
/**
 * Get request for home.
 */
router.get("/", async (req, res) => {
  const locals = {
    title: "NodeJs Blog Made With 💓 by Alif Hassan Aunkur",
    description: "Simple Blog created with NodeJs, Express & MongoDB",
  };

  try {
    const data = await Post.find();
    res.render("index", { locals, data, currentRoute: "/" });
  } catch (error) {
    console.log(error);
  }
});

// Get route Post:id

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug }).exec();
    const locals = {
      title: data.title,
      description: `it's is a blog about ${data.title}`,
    };

    res.render("post", { locals, data, currentRoute: `/posts/${slug}` });
  } catch (err) {
    console.log(err);
  }
});

/*
Post route 
Post -search Term
*/

router.post("/search", async (req, res) => {
  const locals = {
    title: "Seach",
    description: "Simple Blog created with NodeJs, Express & MongoDB",
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { data, locals, currentRoute: "/search" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", async (req, res) => {
  const locals = {
    title: "Seach",
    description: "Simple Blog created with NodeJs, Express & MongoDB",
  };
  res.render("about", { locals, currentRoute: "/about" });
});

module.exports = router;
