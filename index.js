const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/routes");
const connectDB = require("./config/dbConfig");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  connectDB(process.env.MONGO_URI);

  console.log("Your app is listening on port " + listener.address().port);
});
