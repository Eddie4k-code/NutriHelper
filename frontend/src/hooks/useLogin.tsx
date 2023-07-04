import { useState } from "react";
import axios from 'axios';
import { LOGIN } from "../mutations/mutations";

/* Custom Hook for Logging in Users*/

const useLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const login = async (email: string, password: string, onSuccess: (data:any) => void) => {

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:4000/graphql',
                {
                    query: LOGIN.loc!.source.body,
                    variables: { email, password }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
                    
            onSuccess(response.data.data.userLogin);
        } catch (err: any) {
            setError(err.response.data.errors[0].message);
        }

        setIsLoading(false);

    }


    return {login, isLoading, error}

}


export default useLogin;