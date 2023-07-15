import { gql} from "graphql-tag";
import { MutationFunction } from "react-query";

/* All Mutations */


//Register Mutation
export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;


//Login Mutation 
export const LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      id
    }
  }
`;


//Add Recipe to users favorites Mutation
//Login Mutation 
export const ADD_RECIPE_TO_FAVORITES = gql`
  mutation addRecipe($recipeId:Float!, $userId: String!) {
    addRecipe(recipeId: $recipeId, userId: $userId) {
      recipeId
    }
  }
`;




