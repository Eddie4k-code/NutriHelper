import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useAddToFavorites from "../hooks/useAddToFavorites";




//Structure of Recipe
export interface RecipeDetails {
    id: number,
    title: string,
    image: string,
    ingredients: any[],
    summary: string,
    analyzedInstructions: any[]
  }

  //The Details of a specific recipe.
const RecipeDetails = () => {

    //Contains an object with recipe properties.
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);

    const {user} = useAuthContext();
    const {addToFavorites, error} = useAddToFavorites();

    //On first render localStorage is checked for the recipe the user selected to view details for.
    useEffect(() => {
        if (sessionStorage.getItem('selectedItem')) {

            const selectedRecipe = sessionStorage.getItem("selectedItem");
            setRecipe(JSON.parse(selectedRecipe!));
        }
    }, [])

    //Handles functionality for adding a recipe to users favorites
    const handleAddToFavorites = () => {
        if (user) {
          addToFavorites(recipe!.id, user.id);
        }
        console.log('Recipe added to favorites!');
        console.log(user);
      };

    return (

        <>
        
        {!recipe ? (<p>Loading...</p>) :
        
        
        <div className="recipe-details-container">
        <h2>{recipe.title}</h2>
        <div className="recipe-image">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div>


          <button onClick={handleAddToFavorites} className={user ?  "add-to-favorites-button" : "disabled-button-recipe"}>
              {user ? "Add to Favorites" : "Login to Add to Favroites"}
          </button>
        

        </div>

        <p className="error-msg">{error}</p>

        <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h3>Instructions</h3>
          {recipe.analyzedInstructions.map((instruction) => (
            <div key={instruction.number} className="instruction-step">
              <p>Step {instruction.number}</p>
              <p>{instruction.step}</p>
            </div>
          ))}
        </div>
      </div>


        
        
        
        
        }
        
        </>


    );
}

export default RecipeDetails;