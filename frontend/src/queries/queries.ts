
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