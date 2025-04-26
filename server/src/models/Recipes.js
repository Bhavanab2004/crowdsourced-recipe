import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  category: { type: String, enum: ["Veg", "Non-Veg"], required: true, default: "Veg"},
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
