import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [ login, setLogin ] = useState()
    const value = { setLogin, login }
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginProvider, LoginContext }