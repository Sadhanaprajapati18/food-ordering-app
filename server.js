const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error)=>{
    console.log("MongoDB connection error:", error.message);
  });

  app.get("/",(req, res)=>{
    res.send("Food Ordering Backend is Running!");
  });