import React, { useEffect, useState } from 'react';
import useFindRecipe from '../hooks/useFindRecipe';
import RecipeList from '../components/RecipeList';


//Structure of Recipe
export interface RecipeDetails {
  id: number,
  title: string,
  image: string,
  ingredients: any,
  summary: string,
  analyzedInstructions: any
}


const Landing = () => {
  //Custom hook that makes api request tro fetch recipes based on query.
  const {findRecipe, isLoading, error} = useFindRecipe();
  

  const [searchQuery, setSearchQuery] = useState('');

  const [recipes, setRecipes] = useState<RecipeDetails[]>([]);

  //Handles recipe search functionality on client.
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    findRecipe(searchQuery, (data) => setRecipes(data));
  };


  return (
    <div className="recipe-search-page">
      <h1>Recipe Search</h1>
      <div className="search-bar">
        <input
          type="text"
          className="recipe-main-search"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="recipe-main-search-btn" onClick={handleSearch}>Search</button>
      </div>


      {
        /* Conditionally Render Recipes based on loading*/
       isLoading ? (<p>Loading Recipes...</p>) : (<RecipeList recipes={recipes} />)

      }
    </div>
  );
};

export default Landing;