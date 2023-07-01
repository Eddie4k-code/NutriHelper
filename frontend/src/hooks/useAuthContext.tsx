import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Provides a way to access AuthContext values without have to use useContext hook.
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used inside AuthContextProvider');
    }

    return context;
}

