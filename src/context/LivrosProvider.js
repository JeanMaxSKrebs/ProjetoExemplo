import React, { createContext } from 'react';

export const LivrosContext = createContext({});

export const LivrosProvider = ({children}) => {
    return(
        <LivrosContext.Provider value={{}}>
            {children}
        </LivrosContext.Provider>
    );
};