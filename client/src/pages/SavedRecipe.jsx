import { useEffect, useState } from "react";
import axios from "axios";
import SavedCard from "../components/SavedCard";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function SavedRecipe() {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID) {
      navigate("/login");
      return;
    }
    const fetchSaved = async () => {
      try {
        const { data: ids } = await axios.get(
          `http://localhost:5000/recipes/saved/${userID}`
        );
        setSavedIds(ids);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch saved recipes.");
      }
    };
    fetchSaved();
  }, [userID, navigate]);

  useEffect(() => {
    if (!savedIds.length) {
      setLoading(false);
      return;
    }
    const fetchDetails = async () => {
      try {
        const promises = savedIds.map((id) =>
          axios.get(`http://localhost:5000/recipes/${id}`)
        );
        const results = await Promise.all(promises);
        setRecipes(results.map((res) => res.data));
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-8">
          Saved Recipes
        </h1>
        {loading ? (
          <div className="flex justify-center">
            <ReactLoading type="spin" color="#6366F1" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : recipes.length === 0 ? (
          <p className="text-gray-400 text-center">No saved recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <SavedCard
                key={r._id}
                name={r.name}
                imageUrl={r.imageUrl}
                ingredients={r.ingredients}
                instructions={r.instructions}
                cookingTime={r.cookingTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
