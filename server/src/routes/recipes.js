import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post("/create", async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner, category } =
    req.body;
  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    imageUrl,
    category,
    cookingTime,
    userOwner,
  });


  await newRecipe.save();
  res.json({
    message: "✅ Recipe created successfully!",
    color: "green",
    recipe: newRecipe,
  });
});

router.post("/delete", async(req, res) => {
  const { userID, recipeID } = req.body;
  const recipe = await Recipe.deleteOne({_id: recipeID})
  if(recipe.deletedCount == 1)
    res.json({"success": "Successfully deleted the recipe"})
  else
    res.json({"error": "There was an error deleting recipe"})
});

router.put("/save", async (req, res) => {
  const { userID, recipeID } = req.body;
  const recipes = await Recipe.findById(recipeID);
  const user = await User.findById(userID);

  user.savedRecipes.push(recipes);
  await user.save();
  res.json({ message: "✅ Recipe saved successfully", color: "green" });
});

router.get("/saved/:id", async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID);
  const savedRecipes = user.savedRecipes;
  res.json(savedRecipes);
});

router.get("/:id", async (req, res) => {
  const recipeID = req.params.id;
  const recipe = await Recipe.findById(recipeID);
  res.json(recipe);
});

router.put("/:id", async (req, res) => {
  const recipeID = req.params.id;
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner, category } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    recipe.name = name;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.imageUrl = imageUrl;
    recipe.cookingTime = cookingTime;
    recipe.userOwner = userOwner;
    recipe.category = category

    await recipe.save();
    res.status(200).json({ message: "✅ Recipe updated successfully!" });

  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "An error occurred while updating the recipe" });
  }
});


export { router as recipesRouter };
