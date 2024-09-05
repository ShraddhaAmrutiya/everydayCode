const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/blogsystem")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error(error));

  const router= require('./routers/BlogRouter');
  app.use ('/app',router)


app.listen(3000, console.log("server is running on port 3000"));
