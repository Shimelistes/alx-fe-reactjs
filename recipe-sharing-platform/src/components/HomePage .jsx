import React, { useEffect, useState } from "react";
import data from "../data.json"; // import mock data

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // Load recipes on component mount
  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Sharing Platform</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Recipe Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{recipe.summary}</p>
              <a
                href={`/recipe/${recipe.id}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
