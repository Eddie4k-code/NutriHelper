import { useState } from "react";
import axios from 'axios';
import { REGISTER } from "../mutations/mutations";

/* Custom Hook for Registering Users*/

const useRegister = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const register = async (email: string, password: string, onSuccess: () => void) => {

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:4000/graphql',
                {
                    query: REGISTER.loc!.source.body,
                    variables: { email, password }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            await onSuccess();
        } catch (err: any) {
            setError(err.response.data.errors[0].message);
        }

        setIsLoading(false);

    }


    return {register, isLoading, error}

}


export default useRegister;