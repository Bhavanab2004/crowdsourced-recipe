import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useGetUserID } from "../hooks/useGetUserID";
import ReactLoading from "react-loading";

export default function Home() {
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: all } = await axios.get("https://crowdsourced-recipe.onrender.com/recipes");
        const withUser = await Promise.all(
          all.map(async (r) => {
            try {
              const { data: u } = await axios.post(
                "https://crowdsourced-recipe.onrender.com/auth/getUser",
                { userID: r.userOwner }
              );
              return { ...r, username: u.username };
            } catch {
              return { ...r, username: null };
            }
          })
        );
        setRecipes(withUser.reverse());
        if (userID) {
          const { data: saved } = await axios.get(
            `https://crowdsourced-recipe.onrender.com/recipes/saved/${userID}`
          );
          setSavedRecipes(saved);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userID]);

  return (
    <div className="min-h-screen bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-8">
          All Recipes
        </h1>
        {loading ? (
          <div className="flex justify-center">
            <ReactLoading type="spin" color="#6366F1" />
          </div>
        ) : recipes.length === 0 ? (
          <p className="text-gray-400 text-center">No recipes found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <Card
                key={r._id}
                id={r._id}
                name={r.name}
                imageUrl={r.imageUrl}
                ingredients={r.ingredients}
                instructions={r.instructions}
                cookingTime={r.cookingTime}
                userName={r.username}
                bool={savedRecipes.includes(r._id)}
                recipeUserId={r.userOwner}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}