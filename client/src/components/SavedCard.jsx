import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  useEffect(() => {
    if (!userID) {
      navigate("/login");
    }
  }, [userID, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://crowdsourced-recipe.onrender.com/recipes/create",
        {
          name: recipe.name,
          ingredients: recipe.ingredients.filter((ing) => ing.trim()),
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
          cookingTime: recipe.cookingTime,
          userOwner: userID,
        }
      );
      setNotification({ type: "success", message: "Recipe created successfully!" });
      setTimeout(() => {
        setNotification(null);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Failed to create recipe." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-400">Create Recipe</h2>
          <p className="mt-2 text-gray-300">Fill out the details below to add a new recipe.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Recipe Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Spaghetti Bolognese"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Ingredients</label>
            <div className="mt-1 space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={ing}
                  onChange={(e) => handleInputChange(e, idx)}
                  placeholder={`Ingredient ${idx + 1}`}
                  className="block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition"
              >
                + Add Ingredient
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-200">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={4}
              required
              value={recipe.instructions}
              onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the steps..."
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              value={recipe.imageUrl}
              onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-200">
              Cooking Time (minutes)
            </label>
            <input
              id="cookingTime"
              name="cookingTime"
              type="number"
              min="1"
              required
              value={recipe.cookingTime}
              onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-end">
            <NavLink to="/" className="text-sm text-gray-400 hover:text-gray-200 mr-4">
              Cancel
            </NavLink>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition"
            >
              Create
            </button>
          </div>
          {notification && (
            <div
              className={`mt-4 text-center px-4 py-2 rounded-xl ${
                notification.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {notification.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}