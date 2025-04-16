require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { isActiveRoute } = require("./server/helpers/routeHelpers");
// Database connected
const connectDB = require("./server/config/db");
// Database connected
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.use(express.static("public"));
//  Templating Engineer
app.use(expressLayout);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.locals.isActiveRoute = isActiveRoute;

// Do not change
// Initiation of server
app.listen(PORT, () => {
  connectDB();
  console.log("server is running on port " + PORT);
});
