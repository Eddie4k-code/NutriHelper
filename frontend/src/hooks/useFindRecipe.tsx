import { useState } from "react";
import axios from 'axios';
import { checkCurrentUserQuery } from "../queries/queries";
import { setLogger } from "react-query";


//Fetches Recipes and recipe details for each recipe found from users query.

const useFindRecipe = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const findRecipe = async (query:String, onSuccess: (data:any) => void) => {

        setIsLoading(true);
        setError('');

        //If there is a cached result we will use that instead of wasting an api request.
        if (sessionStorage.getItem(`${query}`)) {
          const foundCachedItem = sessionStorage.getItem(`${query}`);
          onSuccess(JSON.parse(foundCachedItem!));
          setIsLoading(false);

          return JSON.parse(foundCachedItem!);
        }

        //Get Recipe Information such as id, image, url.
        const searchOptions = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
          params: {
            query: query,
            instructionsRequired: 'true'
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RECIPE_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
        };
          
          try {
            const searchResponses = await axios.request(searchOptions)
            const recipes = searchResponses.data.results
            
            //Fetch Ingredients, instructions for each recipe.
            const recipePromises = recipes.map(async (recipe:any) => {
              const recipeOptions = {
                method: 'GET',
                url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/information`,
                headers: {
                  'X-RapidAPI-Key': process.env.REACT_APP_RECIPE_KEY,
                  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
              }

              const recipeResponse = await axios.request(recipeOptions)
              const recipeData = recipeResponse.data;

              //Extract the relevent data from the response
              const recipeDetails = {
                id: recipeData.id,
                title: recipeData.title,
                image: recipeData.image,
                summary: recipeData.summary,
                ingredients: recipeData.extendedIngredients,
                analyzedInstructions: recipeData.analyzedInstructions[0].steps
              }

              return recipeDetails;

            });

            const recipesWithDetails = await Promise.all(recipePromises);
            onSuccess(recipesWithDetails);

            //Cache Result in session Storage!
            sessionStorage.setItem(`${query}`, JSON.stringify(recipesWithDetails));
            setIsLoading(false);

          } catch (error) {
            console.error(error);
            setIsLoading(false)
          }

    }


    return {findRecipe, isLoading, error}

}


export default useFindRecipe;