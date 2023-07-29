import React, { useEffect, useState } from 'react';
import useFindRecipe from '../hooks/useFindRecipe';
import RecipeList from '../components/RecipeList';
import { useNavigate, useParams } from 'react-router-dom';


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

  const navigate = useNavigate();
  
  const params = useParams();

  const [searchQuery, setSearchQuery] = useState('');

  const [recipes, setRecipes] = useState<RecipeDetails[]>([]);
   

  //Handles recipe search functionality on client.
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  //Renders all recipe results.
  useEffect(() => {
    if (params.query) {
      findRecipe(params.query!, (data) => setRecipes(data));
    }
  }, [params.query]);


  return (
    <div className="recipe-search-page">
      <h1>Recipe Search</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          className="recipe-main-search"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="recipe-main-search-btn">Search</button>
      </form>


      {
        /* Conditionally Render Recipes based on loading*/
       isLoading ? (<p>Loading Recipes...</p>) : (<RecipeList recipes={recipes} />)

      }
    </div>
  );
};

export default Landing;