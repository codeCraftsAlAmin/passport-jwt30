const { default: mongoose } = require("mongoose");
const config = require("./config");
const dbUrl = config.db.url;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db isn't connected", err);
  });
