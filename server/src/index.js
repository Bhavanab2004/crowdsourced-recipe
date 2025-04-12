import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { usersRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

import { User } from "./models/Users.js";
import { Recipe } from "./models/Recipes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);



mongoose
  .connect(
    "mongodb+srv://bhavana:bhavana@cluster0.bumeszn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("We have again made the connection to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server has started");
});
