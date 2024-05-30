const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const habitRoute = require("./routes/habit");

dotenv.config();
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use((req, res, next) => {
  console.log("Request Body Middleware:", req.body);
  next();
});
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/user", userRoute);
app.use("/v1/habit", habitRoute);

// Đây là route cho trang homepage
app.get("/homepage", (req, res) => {
  res.render("homepage");
});

app.listen(8000, () => {
  console.log("server is running");
});
