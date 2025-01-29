const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/route");
const passport = require("passport");
require("./config/db");

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// routes
app.use(userRouter);

// base route
app.get("/", (req, res) => {
  res.status(201).send("hello users");
});

// handle errors
app.use((req, res, next) => {
  res.status(404).send("router not found");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("something broken");
});

module.exports = app;
