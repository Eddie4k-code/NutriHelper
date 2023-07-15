import { useNavigate } from "react-router-dom";
import { RecipeDetails } from "../pages/Landing";

//Structure of Recipe List Props
interface RecipeListProps {
    recipes: RecipeDetails[]
}



const RecipeList = ({recipes}: RecipeListProps) => {

  const navigate = useNavigate();

    //Sets selected item in session storage, so that way we dont need to waste an additional api request.
  const handleViewDetails = (e:React.MouseEvent<HTMLButtonElement>, item: RecipeDetails) => {
    e.preventDefault();
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    navigate('/test'); //Change Later this redirects to Recipe Details test if selected item works
  }




    return (
        <div className="recipe-list">
          {recipes.map((recipe) => {
            return (
              <div className="recipe-card" key={recipe.id}>
                <img className="recipe-img" src={recipe.image} alt={recipe.title} />
                <h3 className="recipe-title">{recipe.title}</h3>
                <button className="view-details-btn" onClick={(e) => handleViewDetails(e, recipe)}>View Details</button>
              </div>
            );
          })}
        </div>
      );

    

}


export default RecipeList;