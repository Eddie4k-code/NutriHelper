import { useState } from "react";
import axios from 'axios';
import { checkCurrentUserQuery } from "../queries/queries";


//Checks current user information (used in auth context to provide a way to keep user data peristent)

const useCheckUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const checkCurrentUser = async () => {

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:4000/graphql',
                {
                    query: checkCurrentUserQuery.loc!.source.body,
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


    return {checkCurrentUser, isLoading, error}

}


export default useCheckUser;