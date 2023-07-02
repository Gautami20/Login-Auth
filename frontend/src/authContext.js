import React from "react";
import { createContext, useState } from "react";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <authContext.Provider value={{
            loggedIn,
            setLoggedIn,
            isAdmin,
            setIsAdmin
        }
        }>
            {children}
        </authContext.Provider >
    )
}

export default authContext
