import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export default function EditRecipe() {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const userID = useGetUserID();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });

  useEffect(() => {
    if (!userID) {
      navigate("/login");
      return;
    }
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe({
          name: data.name || "",
          ingredients: data.ingredients.length ? data.ingredients : [""],
          instructions: data.instructions || "",
          imageUrl: data.imageUrl || "",
          cookingTime: data.cookingTime || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, navigate, userID]);

  const handleInputChange = (e, idx) => {
    const updated = [...recipe.ingredients];
    updated[idx] = e.target.value;
    setRecipe({ ...recipe, ingredients: updated });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, {
        name: recipe.name,
        ingredients: recipe.ingredients.filter((ing) => ing.trim()),
        instructions: recipe.instructions,
        imageUrl: recipe.imageUrl,
        cookingTime: recipe.cookingTime,
        userOwner: userID,
      });
      setNotification({ type: "success", message: "Recipe updated successfully!" });
      setTimeout(() => {
        setNotification(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to update recipe." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-400">Edit Recipe</h2>
          <p className="mt-2 text-gray-300">Modify your recipe details below.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
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
            />
          </div>

          {/* Ingredients */}
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

          {/* Instructions */}
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
            />
          </div>

          {/* Image URL */}
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
            />
          </div>

          {/* Cooking Time */}
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

          {/* Actions */}
          <div className="flex items-center justify-end">
            <NavLink to="/" className="text-sm text-gray-400 hover:text-gray-200 mr-4">
              Cancel
            </NavLink>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition"
            >
              Save Changes
            </button>
          </div>

          {/* Notification */}
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