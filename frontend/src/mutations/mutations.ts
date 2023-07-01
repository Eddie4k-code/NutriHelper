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


//Login Mutation Mutation
export const LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      id
    }
  }
`;



