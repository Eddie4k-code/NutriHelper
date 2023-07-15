import { useEffect, useState } from "react";



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


    //On first render localStorage is checked for the recipe the user selected to view details for.
    useEffect(() => {

        if (sessionStorage.getItem('selectedItem')) {

            const selectedRecipe = sessionStorage.getItem("selectedItem");
            setRecipe(JSON.parse(selectedRecipe!));
        }

    }, [])

    const handleAddToFavorites = () => {
        // Add your logic for adding the recipe to favorites
        // This is just a placeholder function
        console.log('Recipe added to favorites!');
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
        <button className="add-to-favorites-button" onClick={handleAddToFavorites}>
        Add to Favorites
      </button>

        </div>
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