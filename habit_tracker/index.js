const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");

const userRoute = require("./routes/user");
const habitRoute = require("./routes/habit");

dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views") // Chỉnh sửa phần này
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

// Sử dụng router cho các tuyến đường
app.use("/", userRoute);
app.use("/v1/habit", habitRoute);

app.listen(8000, () =>{
  console.log("server is running");
});
