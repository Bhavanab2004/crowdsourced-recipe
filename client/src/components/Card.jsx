import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  name,
  imageUrl,
  ingredients,
  instructions,
  cookingTime,
  userName,
  bool,
  recipeUserId,
}) {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(bool);

  const editRecipe = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const saveRecipe = async () => {
    try {
      await axios.put("http://localhost:5000/recipes/save", { userID, recipeID: id });
      setSaved(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecipe = async () => {
    try {
      await axios.post("http://localhost:5000/recipes/delete", { userID, recipeID: id });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const isOwn = userID === recipeUserId;

  return (
    <div className="max-w-sm bg-[#1e1e2f] border border-gray-700 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative h-48 w-full">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>
      <div className="p-5 text-gray-200">
        <h3 className="text-center text-2xl font-semibold text-indigo-400 mb-2">{name}</h3>
        <p className="text-sm text-gray-400 mb-3">By {userName || 'Unknown'}</p>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-300">Ingredients:</h4>
          <ul className="list-disc list-inside mt-1 text-gray-400 text-sm">
            {ingredients.map((ing, idx) => (
              <li key={idx}>➡️ {ing}</li>
            ))}
          </ul>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{instructions}</p>
        <div className="flex items-center justify-center mb-4">
          <span className="bg-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            {cookingTime} mins
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {userID && (
            <button
              onClick={saveRecipe}
              className={`px-3 py-1 rounded-xl text-sm font-medium transition 
                ${saved ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-800 text-indigo-400 hover:bg-indigo-700 hover:text-white'}`}
            >
              {saved ? '✨ Saved' : '⭐ Save'}
            </button>
          )}
          {userID && isOwn && (
            <>
              <button
                onClick={editRecipe}
                className="px-3 py-1 rounded-xl text-sm bg-indigo-400 text-gray-900 font-medium hover:bg-indigo-300 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={deleteRecipe}
                className="px-3 py-1 rounded-xl text-sm bg-red-500 text-white font-medium hover:bg-red-400 transition"
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}