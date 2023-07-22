
import { gql } from "graphql-tag";

// Checks current user
export const checkCurrentUserQuery = gql`
  query checkCurrentUser {
    checkCurrentUser {
      id,
      email
    }
  }
`;


//Checks if recipeId is in users favorites
export const findInFavoritesQuery = gql`
  query isRecipeInFavorites($userId: String!, $recipeId: String!) {
    isRecipeInFavorites(userId:$userId, recipeId:$recipeId) 
  }

`