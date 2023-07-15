import { useState } from "react";
import axios from 'axios';
import { ADD_RECIPE_TO_FAVORITES } from "../mutations/mutations";


//Hook for adding a recipe to a user's favorites.

const useAddToFavorites = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const addToFavorites = async (recipeId: number, userId: string) => {

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:4000/graphql',
                {
                    query: ADD_RECIPE_TO_FAVORITES.loc!.source.body,
                    variables: {recipeId, userId}
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );


            return response.data;

          
        } catch (err: any) {
            setError(err.response.data.errors[0].message);
        }

        setIsLoading(false);

    }


    return {addToFavorites, isLoading, error}

}


export default useAddToFavorites;