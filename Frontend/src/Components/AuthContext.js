// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        axios.get("http://localhost:9192/role", { withCredentials: true })
            .then((response) => setRole(response.data.role))
            .catch(() => setRole('user'));  // Default to user if error
    }, []);

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
