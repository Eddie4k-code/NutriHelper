import React, {useState, createContext, useEffect, useContext} from 'react';
import useCheckUser from '../hooks/useCheckUser';

 
//Structure of AuthContext
interface AuthContextValue {
    user: {id: string, email: string} | null;
    authContextLogin: (id: string, email: string) => void
    logout: () => void
} 




//Creation of the Auth Context
export const AuthContext = createContext<AuthContextValue>({user: null, authContextLogin: () => {}, logout: () => {}});


//Props for AuthProvider
export interface AuthContextProviderProps {
    children: React.ReactNode
}

//AuthProvider component to wrap around other components at the higher level.
export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<{id: string, email: string} | null>(null);
    const {checkCurrentUser} = useCheckUser();

    //Sets the user state to the current user logging in.
    const authContextLogin = (id:string, email: string) => {
        const currentUser = {id, email};
        setUser(currentUser);
        console.log('State is ' + JSON.stringify(currentUser));
    }

    //Sets the user state to null due to current user logging out.
    const logout = () => {
        setUser(null);
    }


    useEffect(() => {
        //Retireves current user information to keep the auth context state persistent
        const fetchCurrentUser = async () => {
            const data = await checkCurrentUser();

            if (data && data.data.checkCurrentUser) {
                const {id, email} = data.data.checkCurrentUser;
                authContextLogin(id, email);
                console.log('logged in');
            } else {
                logout();
                console.log('Not Logged in');
            }

        }

        fetchCurrentUser();

    }, []);

    


    return(
    <AuthContext.Provider value={{user, authContextLogin, logout}}>
            {children}

    </AuthContext.Provider>);
    
}
