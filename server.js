const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const router = require("express").Router();
const path = require('path');

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

});

// routes
app.use(require("./routes/api.js"));
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});