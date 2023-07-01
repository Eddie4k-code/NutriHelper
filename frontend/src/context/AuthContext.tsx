import React, {useState, createContext, useEffect, useContext} from 'react';
 
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

    return(
    <AuthContext.Provider value={{user, authContextLogin, logout}}>
            {children}

    </AuthContext.Provider>);
    
}
