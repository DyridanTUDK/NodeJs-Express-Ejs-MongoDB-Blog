const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");

const adminLayout = "../views/layout/admin";
// Get Home:

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDB",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Post / Admin check Login
router.post("/admin", async (req, res) => {
  try {
    const { username, body } = req.body;
    console.log(req.body);

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
