const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layout/admin";
const jwtSecret = process.env.JWT_SECRET;
// Get Home:

// Check Login
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin SignUp",
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
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Admin DashBoard
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard-Add,Edit&Delete Blogs",
      description: "Simple Blog created with NodeJs, Express & MongoDB",
    };
    const data = await Post.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {}
});

// admin create new post
router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & MongoDB",
    };
    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    const { title, body } = req.body;
    try {
      const newPost = new Post({
        title: title,
        body: body,
      });
      await Post.create(newPost);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

// Get edit-post
router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & MongoDB",
    };
    const data = await Post.findOne({ _id: req.params.id });

    res.render(`admin/edit-post`, {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

// PUT
router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

// Admin register
router.get("/register", async (req, res) => {
  try {
    const locals = {
      title: "Admin registration",
      description: "Registration for Admin",
    };
    res.render("admin/register", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});
// Adming register post.
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: error });
    }
  } catch (error) {
    console.log(error);
  }
});

/*
  Delete 
  Admin - Create New Post
*/
router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Admin Logout
router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});
module.exports = router;
