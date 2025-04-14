require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

// Database connected
const connectDB = require("./server/config/db");
// Database connected
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//  Templating Engineer
app.use(expressLayout);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

// Do not change
// Initiation of server
app.listen(PORT, () => {
  connectDB();

  console.log("server is running on port " + PORT);
});
