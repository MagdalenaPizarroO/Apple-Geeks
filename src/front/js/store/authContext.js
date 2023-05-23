// ./store/authContext.js

import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);

    const logIn = (user, id) => {
        setUserName(user);
        setUserId(id);
    };

    const logOut = () => {
        setUserName(null);
        setUserId(null);
    };

    useEffect(() => {
        const user = localStorage.getItem('userName');
        if (user) {
            setUserName(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userName, userId, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
