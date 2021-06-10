const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const URI = "mongodb://localhost:27017/test";
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log("Server is running  at port ", port);
});

const addUser = require("./routes/addNewuser");

app.use("/user", addUser);
