import { RecipeDetails } from "../pages/Landing";

//Structure of Recipe List Props
interface RecipeListProps {
    recipes: RecipeDetails[]
}


const RecipeList = ({recipes}: RecipeListProps) => {


    return (
        <div className="recipe-list">
          {recipes.map((recipe) => {
            return (
              <div className="recipe-card" key={recipe.id}>
                <img className="recipe-img" src={recipe.image} alt={recipe.title} />
                <h3 className="recipe-title">{recipe.title}</h3>
                <button className="view-details-btn">View Details</button>
              </div>
            );
          })}
        </div>
      );

    

}


export default RecipeList;