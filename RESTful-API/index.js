require("dotenv").config();
const express = require("express");
const User = require('./models/user');

const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongodb"))
.catch((error) => console.error(error));

const app = express();
app.use(express.json());
// Routes
app.use('/user',require('./routs/userRout'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(process.env.PORT, () =>
  console.log(`app is running on port ${process.env.PORT}`)
);
