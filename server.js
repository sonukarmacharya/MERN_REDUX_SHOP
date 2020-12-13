const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //get data from body or form request
const path = require("path");
const items = require("./routes/api/items");
const app = express();

//bodyparsers middleware
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected!!"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/items", items);

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
